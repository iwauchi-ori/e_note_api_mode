# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  name                   :string(255)      not null
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_name                  (name)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  module Consts
    EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

    # 半角英数字、英数字混合必須、8文字以上50文字以下
    PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,50}+\z/i

    DEFAULT_LIMIT = 30

    Consts.freeze
  end
  devise :database_authenticatable, :registerable, :recoverable

  validates :name, presence: true, length: { maximum: 255 }, on: :create
  validates :name, presence: true, length: { maximum: 255 }, allow_nil: true, on: :update

  validates :email, presence: true, uniqueness: true, format: { with: Consts::EMAIL_REGEX },
                    length: { maximum: 255 }, on: :create
  validates :email, presence: true, uniqueness: true, format: { with: Consts::EMAIL_REGEX },
                    length: { maximum: 255 }, allow_nil: true, on: :update

  validates :password, presence: true, confirmation: true, length: { in: 8..50 },
                       format: { with: Consts::PASSWORD_REGEX }, on: :create
  validates :password, presence: true, confirmation: true, length: { in: 8..50 },
                       format: { with: Consts::PASSWORD_REGEX }, allow_nil: true, on: :update

  has_many :tretter_tickets

  # def create_user(name:, email:, password:)
  #   ActiveRecord::Base.transaction do
  #       user.create!(name:, email:, password:)
  #   end
  # end
end
