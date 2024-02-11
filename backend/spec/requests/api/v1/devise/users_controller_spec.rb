# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Devise::UsersController do
  let(:user) { create(:user) }

  describe '#create' do
    let(:valid_user_params) do
      { name: 'new_user', email: 'newuser@example.com', password: 'passw0rd' }
    end

    example 'ユーザーを作成できる' do
      post api_v1_users_path, params: valid_user_params.to_json,
                              headers: RequestSpecHelpers::REQ_HEADERS
      expect(response).to have_http_status(:no_content)
    end
  end
end
