# frozen_string_literal: true

module TransformParamsConcern
  extend ActiveSupport::Concern

  private

  def transform_params_to_snake
    params.deep_transform_keys!(&:underscore)
  end
end
