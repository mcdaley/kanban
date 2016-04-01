#------------------------------------------------------------------------------
# serializers/task_serializer.rb
#------------------------------------------------------------------------------
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name
end # end of UserSerializer