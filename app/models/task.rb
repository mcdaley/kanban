##
# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  title       :string
#  description :string
#  due         :datetime
#  complete    :boolean          default("f")
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Task < ActiveRecord::Base
  belongs_to    :user
  
  attr_writer   :due_text 
  
  validates     :title,     presence:   true,
                            length:     { within:   1..255 }
                          
  validates     :complete,  inclusion:  { in:       [true, false] }
  
  validate      :check_due_text
  before_save   :save_due_text
  
  #----------------------------------------------------------------------------
  # Scopes
  #----------------------------------------------------------------------------
  scope         :incomplete,  -> { where(complete:  false).order( due: :asc ) }
  scope         :complete,    -> { where(complete:  true).order(  due: :asc ) }
  scope         :todos,       -> { order( complete: :asc, due: :asc ) }
  
  #----------------------------------------------------------------------------
  # Public
  #----------------------------------------------------------------------------
  def due_text
    @due_text || due.try(:strftime, "%m/%d/%Y")
  end
  
  #----------------------------------------------------------------------------
  # Private
  #----------------------------------------------------------------------------
  private
    
  ##
  # Custom validation method to verify the due text string can be converted 
  # to a date. If not then add a validation error.
  #
  def check_due_text
    if @due_text.present?
      begin
        self.due = Date.strptime(@due_text, "%m/%d/%Y")
        logger.debug "Set task due date=[#{self.due.inspect}]"
      rescue ArgumentError => e
        logger.error "Failed to parse date string=[#{@due_text}]"
        logger.error "#{e.message}"
        logger.error "#{e.backtrace.inspect}"

        errors.add :due_text, "failed to parse #{@due_text}"
      rescue TypeError => e
        logger.error "Failed to parse date string=[#{@due_text}]"
        logger.error "#{e.message}"
        logger.error "#{e.backtrace.inspect}"

        errors.add :due_text, "failed to parse #{@due_text}"
      end
    end
  end # end of check_due_text
  
  ##
  # Convert the due_text virtual attribute to a Date and save it in
  # the database.
  #
  def save_due_text
    self.due = Date.strptime(@due_text, "%m/%d/%Y") if @due_text.present?
  end
  
end
