# frozen_string_literal: true

module Api
  module V1
    module Devise
      class CurrentUserController < ApplicationController
        module Consts
          RESP_FIELDS = %i[id email name].map(&:freeze).freeze

          Consts.freeze
        end

        def show
          with_rescue(__method__) do
            render json: current_user_serializable_hash.to_json, status: :ok
          end
        end

        private

        def current_user_serializable_hash
          UserSerializer.new(current_user, { fields: { user: Consts::RESP_FIELDS } }).serializable_hash
        end
      end
    end
  end
end
