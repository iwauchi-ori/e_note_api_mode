# frozen_string_literal: true

module RequestSpecHelpers
  REQ_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' }.each_value(&:freeze).freeze

  def login(login_user:)
    params = { email: login_user.email, password: login_user.password }.to_json
    post api_v1_user_sessions_path, params:, headers: REQ_HEADERS
  end
end
