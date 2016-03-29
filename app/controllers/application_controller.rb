class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  ##
  # Set the refering page in the session, so we know where to 
  # go back when users cancel forms. Add as a before_filter to 
  # controller methods.
  #
  def set_referer
    ## logger.debug("TASKS: Set referer to #{request.referer}")
    session[:return_to] = request.referer unless request.referer == root_url
  end
  
  ##
  # Retrieve the referring page from the session if it is set. Also, since
  # Capybara does not have access to the session variables, allow user to
  # enter an alternate path to redirect back
  #
  # ==== Params
  # * +alternate_path+ - Will return user to the alternate path and override
  #                      the session[:return_to]
  #
  def get_referer(alternate_path = nil)
    ## logger.debug("TASKS: Get referer, session[:return_to]=#{session[:return_to]}")
    return alternate_path       unless alternate_path.nil?
    return session[:return_to]  unless session[:return_to].nil?
    return :back
  end
  helper_method :get_referer
  
end # end of class ApplicationController
