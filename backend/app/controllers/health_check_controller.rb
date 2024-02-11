# frozen_string_literal: true

class HealthCheckController < ApplicationController
  def index
    head :no_content
  end
end
