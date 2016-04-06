class TasksController < ApplicationController
  before_action   :authenticate_user!
  
  before_filter   :set_referer,       only: [:new, :edit, :index]
  
  def show
    logger.debug_params(params, "TASKS")
    
    @user   = current_user
    @task   = @user.tasks.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render json: @task }
    end
  end

  #############################################################################
  # TODO: 03/30/2016
  # - NEED TO FIGURE OUT THE BEST WAY TO RETURN THE TASKS, AS I HAVE A FEW
  #   OPTIONS, SINCE I CAN'T COMBINE THE OBJECTS IN ACTIVE_MODEL_SERIALIZERS
  #   1. CREATE AN ARRAY OF ARRAYS OF TASKS, INCOMPLETE WOULD BE THE [0]
  #   2. COMBINE THE INCOMPLETE AND COMPLETE ARRAYS INTO A SINGLE ARRAY AND
  #      UI WOULD HAVE TO SPLIT UP THE COMPLETE/INCOMPLETE TASKS
  #   3. CREATE A PLANE RUBY OBJECT IN MODELS THAT IS A COMBINATION
  #   4. SWITCH TO THE JBUILDER GEM, WHICH PROVIDES ACCESS TO ALL OF THE 
  #      INSTANCE MODELS.
  #
  # - FOR NOW, I JUST RETRIEVE ALL OF THE TODOS FOR THE USER AND THEN USE
  #   THE incomplete AND complete SCOPES IN THE VIEW, WHICH SEEMS PRETTY
  #   STRAIGHT FORWARD.
  #############################################################################
  def index
    logger.debug_params(params, "TASKS")
    
    @user   = current_user
    @task   = @user.tasks.new
    @tasks  = @user.tasks.todos
    
    respond_to do |format|
      format.html { render :index                   }
      format.json { 
        render json:  @tasks
      }
    end
  end
  
  def new
    logger.debug_params(params, "TASKS")
    
    @user = current_user
    @task = @user.tasks.new
  end

  def create
    logger.debug_params(params, "TASKS")
    #
    # If user clicks cancel, do not create the task, redirect back to
    # previous page, and exit the mehtod #create
    #
    if params[:commit] =~ /Cancel/ || params[:commit] =~ /Clear/
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
      logger.debug "TASKS: Created task id=[@task.id], title=[@task.title]"
      respond_to do |format|
        format.html { redirect_to get_referer                   }
        format.json { render      json: @task, status: :created }
      end
    else
      respond_to do |format|
        format.html { render      'new'                                             }
        format.json { render      json: @task.errors, status: :unprocessable_entity }
      end
    end  
  end

  def edit
    logger.debug_params(params, "TASKS")
    
    @user = current_user
    @task = @user.tasks.find(params[:id])
    
    respond_to do |format|
      format.html { render 'edit' }
    end
  end

  def update
    logger.debug_params(params, "TASKS")
    
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
        format.json { head        :no_content }
      end
    else
      respond_to do |format|
        logger.log_error_messages(@task, "TASKS")
        format.html { render      'new'                                             }
        format.json { render      json: @task.errors, status: :unprocessable_entity }
      end
    end     
  end
  
  ##
  # Toggle task between complete and incomplete
  #
  def check
    logger.debug_params(params, "TASKS")
    
    @user = current_user
    @task = @user.tasks.find(params[:id])
    
    if @task.update_attributes(task_params)
      respond_to do |format|
        format.html { redirect_to :back       }
        format.json { head        :no_content }
      end
    else
      respond_to do |format|
        logger.log_error_messages(@task, "TASKS")
        format.html { redirect_to :back                                             }
        format.json { render      json: @task.errors, status: :unprocessable_entity }
      end
    end     
  end 

  def destroy
    logger.debug_params(params, "TASKS")
    
    @user = current_user
    @task = @user.tasks.destroy(params[:id])
    
    respond_to do |format|
      format.html { redirect_to :back       }
      format.json { head        :no_content }
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
                                    :due_text,
                                    :complete,
                                    :user_id )
    end
end
