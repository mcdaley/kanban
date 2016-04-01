#------------------------------------------------------------------------------
# spec/routing/tasks_routing.rb
#------------------------------------------------------------------------------
require 'rails_helper'

RSpec.describe TasksController, type: :routing do
  it { expect( get:    "/tasks"   ).to route_to( "tasks#index"            ) }
  it { expect( get:    "/tasks/1" ).to route_to( "tasks#show",    id: "1" ) }
  it { expect( post:   "/tasks"   ).to route_to( "tasks#create"           ) }
  it { expect( put:    "/tasks/1" ).to route_to( "tasks#update",  id: "1" ) }
  it { expect( delete: "/tasks/1" ).to route_to( "tasks#destroy", id: "1" ) }
end # end of RSpec.describe TasksController