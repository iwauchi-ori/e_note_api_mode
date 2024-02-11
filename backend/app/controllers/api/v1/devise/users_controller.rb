# frozen_string_literal: true

module Api
  module V1
    module Devise
      class UsersController < ApplicationController
        module Consts
          DEFAULT_ORDER_KEY = 'created_at'
          DEFAULT_ORDER_METHOD = 'desc'
          USER_ATTRS = %w[name privilege email].map(&:freeze).freeze

          Consts.freeze
        end

        before_action :post_params, only: %i[create]

        def create
          with_rescue(__method__) do
            User.create!(name: params[:name], email: params[:email], password: params[:password])
            render json: 'user is created!', status: :no_content
          end
        end

        private

        def post_params
          params.permit(:name, :email, :password)
        end
      end
    end
  end
end
