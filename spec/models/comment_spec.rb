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

require 'rails_helper'

RSpec.describe Comment, type: :model do
  
  describe "DB structure" do
    it { is_expected.to     have_db_column( :body             ).of_type( :text     ) }
    it { is_expected.to     have_db_column( :commentable_type ).of_type( :string   ) }
    it { is_expected.to     have_db_column( :commentable_id   ).of_type( :integer  ) }
    it { is_expected.to     have_db_column( :user_id          ).of_type( :integer  ) }
    it { is_expected.to     have_db_column( :created_at       ).of_type( :datetime ) }
    it { is_expected.to     have_db_column( :updated_at       ).of_type( :datetime ) }
  end # end of describe "DB structure"
  
  describe "Validations" do
    it { is_expected.to     validate_presence_of( :body                     ) }
    it { is_expected.to     validate_length_of(   :body ).is_at_least(    1 ) }
    it { is_expected.to     validate_length_of(   :body ).is_at_most(  1024 ) }
    it { is_expected.to_not allow_value("").for(  :body                     ) }
    
    it { is_expected.to     validate_presence_of( :user                     ) }
    it { is_expected.to     belong_to(            :user                     ) }
  end # end of describe "Validations"
  
  describe "Comment #new" do
    let(:user)      { FactoryGirl.create( :user                                         ) }
    let(:task)      { FactoryGirl.create( :task,    user:         user                  ) }
    let(:comment)   { FactoryGirl.create( :comment, commentable:  task, user: task.user ) }
    
    it "Saves a valid comment" do
      expect(comment.body             ).to  eq( "First comment" )
      expect(comment.commentable_type ).to  eq( "Task"          )
      expect(comment.commentable_id   ).to  eq( task.id         )
      expect(comment.user_id          ).to  eq( task.user.id    )
    end
  end
  
end # end of RSpec.describe Comment
