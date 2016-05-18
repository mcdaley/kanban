#------------------------------------------------------------------------------
# app/serializers/comment_serializer.rb
#------------------------------------------------------------------------------
class CommentSerializer < ActiveModel::Serializer
  
  attributes  :id, :body, :commentable_type, :commentable_id, :user_id

end # end of CommentSerializer
