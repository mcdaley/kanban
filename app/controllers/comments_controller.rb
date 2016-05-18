#------------------------------------------------------------------------------
# app/controllers/comments_controller.rb
#------------------------------------------------------------------------------
class CommentsController < ApplicationController
  before_action   :authenticate_user!
  
  def create
    logger.debug_params(params, "COMMENTS")
    
    @comment      = @commentable.comments.new(comment_params)
    @comment.user = current_user
    
    if @comment.save
      respond_to do |format|
        format.html {
          redirect_to   @commentable,   notice: "Your comment was successfully posted."
        }
        format.json {
          render        json: @comment, status: :created 
        }
      end
    else
      logger.log_error_messages(@comment, "COMMENTS")
      
      respond_to do |format|
        format.html {
          flash[:error] = "Failed to save the comment"
          redirect_to   @commentable
        }
        format.json {
          render        json: @comment.errors,  status: :unprocessable_entity
        }
      end
    end
  end
  
  #----------------------------------------------------------------------------
  # Private
  #----------------------------------------------------------------------------
  private
    def comment_params
      params.require(:comment).permit(:body)
    end
end
