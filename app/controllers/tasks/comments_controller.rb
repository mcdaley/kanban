#------------------------------------------------------------------------------
# app/controllers/tasks/comments_controller.rb
#------------------------------------------------------------------------------
class Tasks::CommentsController < CommentsController
  before_action   :set_commentable
  
  #----------------------------------------------------------------------------
  # Private
  #----------------------------------------------------------------------------
  private
    def set_commentable
      @commentable = Task.find(params[:task_id])
    end
end