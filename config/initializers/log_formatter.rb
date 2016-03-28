#------------------------------------------------------------------------------
# config/initializers/log_formatter.rb
#
# Set of utility methods to help format log files
#------------------------------------------------------------------------------

##
# Monkey patch log formatter so that the severity is added to
# the beginning of every log message.
#
class ActiveSupport::Logger::SimpleFormatter
  def call(severity, time, progname, msg)
    "[#{severity}] #{msg}\n"
  end
end

##
# Add support to log the "user id" by extracting the user id from the
# session if the user is logged into the application, otherwise return
# nil. 
#
# The method is called from the config.log_tags section in the specific
# environment initialization file.
# 
# NOTE:
# Instead of adding tests for "nil" when looking for the session,
# the code just rescues the exception that is thrown when either 
# session_key, session_data, or warden_data are nil.
#
module WardenTaggedLogger
  def self.extract_user_id_from_request(req)
    session_key   = Rails.application.config.session_options[:key]
    session_data  = req.cookie_jar.encrypted[session_key]
    warden_data   = session_data["warden.user.user.key"]
    warden_data[0][0]
    rescue
      nil
  end
end # end of module WardenTaggedLogger

##
# Monkey patch utility methods to the Logger
#
class ActiveSupport::Logger
  ##
  # Log the parameters passed into a controller to help with debugging. 
  # Just pass in the params hash as well as an optional grep string that
  # you can use to debug in the log file.
  #
  def debug_params(params, grep_string = '')
    prefix = grep_string.empty? ? "" : "[#{grep_string}] "
    self.debug { "#{prefix} Controller=[#{params[:controller]}], Action=[#{params[:action]}], Params=[#{params.inspect}]" }
  end
  
  ##
  # Log an object via a call to inspect. Just pass in the object and an
  # optional grep string that can be used to search in the log file
  #
  def log_inspect(object, grep_string = '')
    prefix = grep_string.empty? ? "" : "[#{grep_string}] "
    self.debug { "#{prefix} Class=[#{object.class}], Inspect=[#{object.inspect}]" }
  end
  
  ##
  # Log the error messages for a model, to use from the controller just call:
  # logger.log_error_messages(model, grep_string), where model is the object with 
  # the errors and the grep_string is an optional string to prefix the log
  # message, so that you can use grep to filter out the messages when 
  # debugging. 
  #
  def log_error_messages(model, grep_string = '')
    prefix = grep_string.empty? ? "" : "[#{grep_string}] "
    self.error "#{prefix} Unable to save the #{model.class}"
    model.errors.each do |name, msg|
      self.error "#{prefix} #{model.class}[#{name}] = [#{msg}]"
    end
  end
end # end of class ActiveSupport::Logger
