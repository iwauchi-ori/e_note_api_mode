# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Devise::UserSessionsController do
  let(:user) { create(:user) }

  describe '#create' do
    let(:valid_user_params) do
      { email: user.email, password: user.password }.to_json
    end

    example '登録済みのユーザーでログインできる' do
      post api_v1_user_sessions_path, params: valid_user_params,
                                      headers: RequestSpecHelpers::REQ_HEADERS

      expect(response).to have_http_status(:no_content)
    end
  end

  describe '#destroy' do
    context 'ユーザーとしてログインしている場合' do
      before { login(login_user: user) }

      example 'ログアウトができる' do
        delete api_v1_user_sessions_path, headers: RequestSpecHelpers::REQ_HEADERS
        aggregate_failures do
          expect(session.present?).to be false
          expect(response).to have_http_status(:no_content)
        end
      end
    end
  end
end
