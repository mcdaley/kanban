#------------------------------------------------------------------------------
# config/routes.rb
#------------------------------------------------------------------------------
Rails.application.routes.draw do
  devise_for  :users
  
  resources   :tasks
  
  # Set the root page
  root        to:   'pages#home'
end
