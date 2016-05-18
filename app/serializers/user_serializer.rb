#------------------------------------------------------------------------------
# app/serializers/user_serializer.rb
#------------------------------------------------------------------------------
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name
end # end of UserSerializer