#------------------------------------------------------------------------------
# spec/factories/factories.rb
#------------------------------------------------------------------------------

FactoryGirl.define do
  #----------------------------------------------------------------------------
  # Users
  #----------------------------------------------------------------------------
  factory :unconfirmed_user, class: User do |f|
    f.name                    "Thurmon Thomas"
    f.email                   "thurmon.thomas@bills.com"
    f.password                "foobar123"
    f.password_confirmation   "foobar123"

    after(:build)  do |u|
      u.skip_confirmation_notification!
    end
    
    #
    # Set user to a confirmed user to keep the tests cleaner
    #
    factory :user, :parent => :unconfirmed_user do
      after(:build)  do |u|
        u.skip_confirmation_notification!
      end
      
      after(:create) do |u|
        u.confirm
      end
    end # end of factory :user
    
  end # end of factory :uncomfirmed_user
  
  #----------------------------------------------------------------------------
  # Tasks
  #----------------------------------------------------------------------------
  factory :task do |f|
    f.title                     "First task"
    f.description               "First description"
    ##f.due_text                  (Date.today + 4).strftime('%m/%d/%Y')
    f.due                       Date.today + 4
    f.complete                  false
    association :user,          factory: :user
  end # end of factory :task

end # end of FactoryGirl.define
