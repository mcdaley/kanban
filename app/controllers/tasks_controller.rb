class TasksController < ApplicationController
  before_action   :authenticate_user!
  
  before_filter   :set_referer,       only: [:new, :edit]
  
  def show
    logger.debug("TASKS, params=#{params.inspect}")
    @user   = current_user
    @task   = @user.tasks.find(params[:id])
  end

  def index
    @user   = current_user
    @tasks  = @user.tasks.all
  end
  
  def new
    @user = current_user
    @task = @user.tasks.new
  end

  def create
    #
    # If user clicks cancel, do not create the task, redirect back to
    # previous page, and exit the mehtod #create
    #
    if params[:commit] =~ /Cancel/
      respond_to do |format|
        format.html {
          redirect_to   get_referer
          return
        }
      end
    end
    
    @user = current_user
    @task = @user.tasks.new(task_params)
    
    if @task.save
      respond_to do |format|
        format.html { redirect_to get_referer }
      end
    else
      respond_to do |format|
        format.html { render 'new'    }
      end
    end  
  end

  def edit
    @user = current_user
    @task = @user.tasks.find(params[:id])
    
    respond_to do |format|
      format.html { render 'edit' }
    end
  end

  def update
    #
    # Redirect to prvious  page is user clicks cancel
    #
    if params[:commit] =~ /Cancel/
      respond_to do |format|
        format.html { 
          redirect_to get_referer 
          return
        }
      end
    end
    
    @user = current_user
    @task = @user.tasks.find(params[:id])
    
    if @task.update_attributes(task_params)
      respond_to do |format|
        format.html { redirect_to get_referer }
      end
    else
      respond_to do |format|
        format.html { render  'new'   }
      end
    end     
  end

  def destroy
    @user = current_user
    @task = @user.tasks.destroy(params[:id])
    
    respond_to do |format|
      format.html { redirect_to :back }
    end
  end
  
  #----------------------------------------------------------------------------
  # Private
  #----------------------------------------------------------------------------
  private
    
    ##
    # Strong parameters
    #
    def task_params
      params.require(:task).permit( :title,
                                    :description,     
                                    :due,
                                    :complete,
                                    :user_id )
    end
end
