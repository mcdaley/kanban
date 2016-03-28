module TasksHelper
  
  def due_date_text(task)
    if task.due.nil?
      "-"
    else
      task.due.strftime('%m/%d/%y')
    end
  end
  
end # end of module TasksHelper
