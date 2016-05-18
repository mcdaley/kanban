#------------------------------------------------------------------------------
# config/routes.rb
#------------------------------------------------------------------------------
Rails.application.routes.draw do
  get 'comments/create'

  devise_for  :users
  
  resources   :tasks do
    member    { patch     :check }
    resource  :comments,  module: :tasks
  end
  
  # Set the root page
  root        to:   'pages#home'
end
