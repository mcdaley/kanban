# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text
#  commentable_type :string
#  commentable_id   :integer
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

#------------------------------------------------------------------------------
# models/comment.rb
#------------------------------------------------------------------------------
class Comment < ActiveRecord::Base
  belongs_to            :commentable,   polymorphic: true
  belongs_to            :user
  
  validates             :body,          presence:   true,
                                        length:     { within:   1..1024 }
                              
  validates_presence_of :user
  validates_associated  :user
end
