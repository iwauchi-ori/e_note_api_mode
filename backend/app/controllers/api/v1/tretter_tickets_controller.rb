# frozen_string_literal: true

module Api
  module V1
    class TretterTicketsController < ApplicationController
      def create
        with_rescue(__method__) do
          current_user.tretter_tickets.ticket_create(params: title_params)
          head :ok
        end
      end

      private

      def title_params
        params.permit(:title)
      end
    end
  end
end
