#------------------------------------------------------------------------------
# spec/controllers/tasks_controller.rb
#------------------------------------------------------------------------------
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  let(:user_with_tasks) { FactoryGirl.create(:user_with_tasks)  }
  
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
    
    describe "respond_to JSON" do
      context "signed-in user" do
        before { sign_in user_with_tasks }
        
        it "assigns all tasks as @tasks" do        
          get :index, { format: :json }
          expect(assigns(:tasks)).to              eq(user_with_tasks.tasks.todos)
          expect(assigns(:tasks)[0].complete).to  eq(false)
          expect(assigns(:tasks)[-1].complete).to eq(true)
        end
      end
    end # end of describe "respond_to JSON"
  end # end of describe 'GET #index'
  
  describe 'GET #show' do
    context 'respond_to JSON' do
      before { sign_in user_with_tasks }
      
      it "assigns the task as @task" do
        task = user_with_tasks.tasks.todos[0]
        
        get :show, { id: task.id, format: :json }
        expect(assigns(:task)).to eq(task)
      end
    end # end of context 'respond_to JSON'
    
  end # end of describe 'GET #show'
  
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

    describe "respond_to JSON" do
      context "with valid params" do
        it 'creates a task' do
          expect {
            post :create, { task: attributes_for(:task), format: :json  }
          }.to change(Task, :count).by(1)      
        end
      end # end of context "with valid params"
      
      context "with invalid params" do
        let(:invalid_attrs) { FactoryGirl.attributes_for(:task, title: nil, due_text: "bad") }
        
        it "assigns a newly created but unsaved task as @task" do
          post :create, { task: invalid_attrs, format: :json  }
          expect(assigns(:task)).to be_a_new(Task)
        end
        
        it "returns unprocessable_entity status" do
          put :create, { task: invalid_attrs, format: :json }
          expect(response.status).to eq(422)
        end
      end # end of context "with invalid params"
    end # end of describe "respond_to JSON"

    describe "respond_to HTML" do
      context "with valid params" do
        it 'creates a task' do
          expect {
            post :create, { task: attributes_for(:task)  }
          }.to change(Task, :count).by(1)
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
          post    :create, task: attrs
        
          expect(Task.count).to eq(0)
        end
      end
    end # end of describe "respond_to HTML"
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
  
  describe 'PUT #update' do
    let(:task)          { user_with_tasks.tasks.incomplete[0]   }
    let(:valid_attrs)   { { 
                            title:    "Edit task title test", 
                            due_text: (Date.today + 30).strftime('%m/%d/%Y')
                        } }

    before              { 
                          sign_in user_with_tasks               
                          request.env["HTTP_REFERER"] = tasks_path
                        }
    
    describe 'respond_to HTML' do
      context 'with valid params' do
        it 'updates the task' do
          put :update, { id: task.id, task: valid_attrs, format: :html  }
          task.reload
          expect(task.title ).to   eq( valid_attrs[:title]  )
          expect(task.due   ).to   eq( Date.today + 30      )
        end
        
        it "assigns the requested task as @task" do
          put :update, { id: task.id, task: valid_attrs, format: :html  }
          expect(assigns(:task)).to eq(task)
        end
      end # end of context 'with valid params'
      
      context 'with invalid params' do
        let(:invalid_attrs) { FactoryGirl.attributes_for(:task, title: nil, due_text: "bad") }
        
        it "assigns the task as @task" do
          put :update, { id: task.id, task: invalid_attrs, format: :html  }
          expect(assigns(:task)).to eq(task)
        end
      end # end of context 'with invalid_params'
    end # end of describe 'respond_to HTML'
    
    describe 'respond_to JSON' do
      context 'with valid params' do
        it 'updates the task' do
          put :update, { id: task.id, task: valid_attrs, format: :json  }
          task.reload
          expect(task.title ).to   eq( valid_attrs[:title]  )
          expect(task.due   ).to   eq( Date.today + 30      )
        end
        
        it "assigns the requested task as @task" do
          put :update, { id: task.id, task: valid_attrs, format: :json  }
          expect(assigns(:task)).to eq(task)
        end
      end # end of context 'with valid params'
      
      context 'with invalid params' do
        let(:invalid_attrs) { FactoryGirl.attributes_for(:task, title: nil, due_text: "bad") }
        
        it "assigns the task as @task" do
          put :update, { id: task.id, task: invalid_attrs, format: :json  }
          expect(assigns(:task)).to eq(task)
        end

        it "returns unprocessable_entity status" do
          put :update, { id: task.id, task: invalid_attrs, format: :json }
          expect(response.status).to eq(422)
        end
      end # end of context 'with invalid params'
    end # end of describe 'respond_to JSON'
    
  end # end of describe 'PUT #update'
  
  describe 'DELETE #destroy' do
    let(:task)  { user_with_tasks.tasks.incomplete[0]   }
    before      { 
                  sign_in user_with_tasks               
                  request.env["HTTP_REFERER"] = tasks_path
                }
                          
    describe 'respond_to HTML' do
      it "destroys the requested task" do
        expect {
          delete :destroy, { id: task.id, format: :html  }
        }.to change(Task, :count).by(-1)
      end

      it "redirects to the tasks list" do
        delete :destroy, { id: task.id, format: :html  }
        expect(response.status).to eq(302)
      end
    end # end of describe 'respond_to HTML'

    describe 'respond_to JSON' do
      it "destroys the requested task" do
        expect {
          delete :destroy, { id: task.id, format: :json  }
        }.to change(Task, :count).by(-1)
      end

      it "redirects to the tasks list" do
        delete :destroy, { id: task.id, format: :json  }
        expect(response.status).to eq(204)
      end
    end # end of describe 'respond_to JSON'
  end # end of describe 'DELETE #destroy'
  
end # end of RSpec.describe Task