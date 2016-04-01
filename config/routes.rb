#------------------------------------------------------------------------------
# config/routes.rb
#------------------------------------------------------------------------------
Rails.application.routes.draw do
  devise_for  :users
  
  resources   :tasks do
    member  { patch   :check }
  end
  
  # Set the root page
  root        to:   'pages#home'
end
