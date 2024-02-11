# frozen_string_literal: true

# == Schema Information
#
# Table name: tretter_tickets
#
#  id                               :bigint           not null, primary key
#  ticket_title(チケットのタイトル) :string(255)      not null
#  created_at                       :datetime         not null
#  updated_at                       :datetime         not null
#  user_id                          :bigint
#
# Indexes
#
#  index_tretter_tickets_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class TretterTicketTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
