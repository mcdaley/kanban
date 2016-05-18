#------------------------------------------------------------------------------
# app/serializers/task_serializer.rb
#------------------------------------------------------------------------------
class TaskSerializer < ActiveModel::Serializer
  
  attributes  :id, :title, :description, :due, :complete, :path
  has_one     :user
  has_many    :comments
  embed       :ids, include: true
  
  def path
    task_path(object)
  end
 
=begin 
  def url
    task_url(object, only_path: true)
  end
=end
  
end # end of class TaskSerializer
