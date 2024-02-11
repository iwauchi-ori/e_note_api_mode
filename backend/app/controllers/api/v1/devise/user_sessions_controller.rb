# frozen_string_literal: true

module Api
  module V1
    module Devise
      class UserSessionsController < ApplicationController
        def create
          with_rescue(__method__) do
            user = User.find_for_authentication(email: user_session_params[:email])
            raise_unauthorized if user.blank?

            is_success = user&.valid_password?(user_session_params[:password])
            raise_unauthorized unless is_success

            bypass_sign_in(user)
            head :no_content
          end
        end

        def destroy
          with_rescue(__method__) { head signed_out? ? :no_content : :unprocessable_entity }
        end

        private

        def user_session_params
          params.permit(:email, :password)
        end

        def raise_unauthorized
          raise ApplicationController::UnauthorizedError, 'Unauthorized'
        end

        def signed_out?
          sign_out
        end
      end
    end
  end
end
