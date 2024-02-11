# frozen_string_literal: true

module WithRescueConcern
  extend ActiveSupport::Concern

  private

  def out_error_log(error, method_name = nil)
    Rails.logger.error("#{self.class.name}#{method_name&.then { |m| "##{m}" }}\n#{error.message}")
  end

  # TODO: 例外発生時のレスポンス仕様の検討
  def generate_error_resp_hash(message = '')
    { isApiError: true, message: }
  end

  def render_error(status, error, method_name = nil)
    out_error_log(error, method_name)
    render json: generate_error_resp_hash(error.message).to_json, status:
  end

  def with_rescue(method_name)
    yield
  # rescue ApplicationController::UnauthorizedError => e
  #   render_error(:unauthorized, e, method_name)
  # rescue ActiveRecord::RecordNotFound, ApplicationController::NotFoundError, User::NotHavingPrivilegeError => e
  #   render_error(:not_found, e, method_name)
  # rescue ActiveRecord::RecordNotUnique, ActiveRecord::RecordInvalid, ApplicationController::UnprocessableEntityError,
  #        ArgumentError => e
  #   render_error(:unprocessable_entity, e, method_name)
  rescue StandardError => e
    out_error_log(e, method_name)
    render json: generate_error_resp_hash('Something wrong').to_json, status: :internal_server_error
  end
end
