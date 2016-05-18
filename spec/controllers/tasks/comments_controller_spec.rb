#------------------------------------------------------------------------------
# spec/controllers/comments_controller.rb
#------------------------------------------------------------------------------
require 'rails_helper'

RSpec.describe Tasks::CommentsController, type: :controller do
  let(:user) { FactoryGirl.create(:user)}
  let(:task) { FactoryGirl.create(:task, user: user) }

  describe 'POST #create' do
    
    before      { 
      request.env["HTTP_REFERER"] = tasks_path
      sign_in user
    }

    describe "respond_to JSON" do
      context "hacking it together" do
        it 'creates a comment' do
          expect {
            post :create, { comment: { body: "Hello World" }, task_id: task.id, format: :json }
          }.to change(Comment, :count).by(1)
        end
      end

      context "with invalid params" do
        it "returns unprocessable_entity status" do
          post :create, { comment: { body: "" }, task_id: task.id, format: :json }
          expect(response.status).to eq(422)
        end
      end
    end # end of describe "respond_to JSON"

  end # end of describe 'POST #create'
  
end # end of RSpec.describe CommentsController