# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Devise::CurrentUserController do
  let(:user) { create(:user) }

  describe '#show' do
    context 'ユーザーとしてログインしている場合' do
      before { login(login_user: user) }

      example 'ステータスOKでログイン中のユーザ情報を取得できる' do
        get api_v1_current_user_path, headers: RequestSpecHelpers::REQ_HEADERS
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
