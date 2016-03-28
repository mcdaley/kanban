#------------------------------------------------------------------------------
# spec/controllers/tasks_controller.rb
#------------------------------------------------------------------------------
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  
  describe 'GET #index' do
    context "unsigned-in user" do
      it "redirects user to sign-in page" do
        get :index
        expect(response).to redirect_to(new_user_session_path)
      end
    end # end of context "unsigned-in user"
    
    context "signed-in user" do
      login_user
      
      it "should get index" do
        get :index
        expect(response).to be_success
      end
    end # end of context "signed-in user"
  end # end of describe 'GET #index'
  
  describe 'GET #new' do
    context "unsigned-in user" do
      it "redirects user to sign-in page" do
        get :new
        expect(response).to redirect_to(new_user_session_path)
      end
    end
    
    context "signed-in user" do
      login_user
      
      it "should get new" do
        get :new
        expect(response).to be_success
      end
    end
  end # end of desribe 'GET #new'
  
  describe 'POST #create' do
    login_user
    
    before { request.env["HTTP_REFERER"] = tasks_path }
    
    context "with valid attributes" do
      it 'creates a task' do
        
        post :create, task: attributes_for(:task)
        
        expect(Task.count).to eq(1)
        expect(response).to   redirect_to(tasks_path)
      end      
    end # end of context "with valid attributes"
    
    context "with invalid attributes" do
      it "ignores extra params" do
        attrs = attributes_for(:task).merge({bad: "bad-attribute"})
        post    :create, task: attrs
        
        expect(Task.count).to eq(1)
      end
      
      it "does not create a task" do
        attrs = { one: "first", second: "second" }
        puts    "DEBUG: attrs= #{attrs.inspect}"
        post    :create, task: attrs
        
        expect(Task.count).to eq(0)
      end
    end
  end # end of describe 'POST #create'
  
  #############################################################################
  # TODO: 03/28/2016
  # - NEED TO FIGURE OUT WHICH VERSION THAT I LIKE MORE, BOTH TESTS ARE
  #   DOING THE SAME THING
  #
  # - COULD ALSO USER THE current_user HELPER IN THE TESTS INSTEAD OF 
  #   CREATING THE @me VARIABLE IN THE MACRO FOR VERSION 2 (tried but didn't 
  #   work as current_user was not defined)
  #############################################################################
  describe 'GET #edit (Version 1)' do
    let!(:user_with_tasks) { FactoryGirl.create(:user_with_tasks) }

    context "signed-in user" do
      before { sign_in user_with_tasks }
      
      it "should get edit" do
        task_id = user_with_tasks.tasks.all[0].id
        get(:edit, {id: task_id})
        expect(response).to be_success
      end
    end
  end # end of describe 'GET #edit (Version 1)'
  
  describe 'GET #edit (Version 2)' do
    login_my_user(:user_with_tasks)

    context "signed-in user" do    
      it "should get edit" do
        task_id = @me.tasks.all[0].id
        get(:edit, {id: task_id})
        expect(response).to be_success
      end
    end
  end # end of describe 'GET #edit (Version 2)'
  
end # end of RSpec.describe Task