# frozen_string_literal: true

module Api
  module Boundary
    module V1
      class BaseController < ActionController::API
        include TransformParamsConcern

        before_action :authorize_boundary_api_authentication
        before_action :transform_params_to_snake

        private

        def current_boundary_api_authentication
          @current_boundary_api_authentication ||= \
            ::Api::Boundary::V1::Base::AuthorizeBoundaryApiAuthenticationService.new(
              authorization_header: request.headers['Authorization'] || request.headers['authorization']
            ).execute
        end

        def authorize_boundary_api_authentication
          with_rescue(__method__) do
            current_boundary_api_authentication
          end
        end

        def authorized_company
          current_boundary_api_authentication.company
        end

        def with_rescue(method_name)
          yield
        rescue ::Api::Boundary::V1::BadRequestError => e
          render json: e.attrs_as_json, status: :bad_request
        rescue ::Api::Boundary::V1::UnauthorizedError => e
          render json: e.attrs_as_json, status: :unauthorized
        rescue StandardError => e
          j = ::Api::Boundary::V1::InternalServerError.new(
            failed_method_name: "#{self.class.name}##{method_name}",
            original_message: e.message
          ).attrs_as_json

          render json: j, status: :internal_server_error
        end
      end
    end
  end
end
