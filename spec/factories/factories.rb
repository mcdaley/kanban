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
    
    factory :user_with_tasks, :parent => :user do
      name                "Jim Kelly"
      email               "jkelly@bills.com"

      after(:create) do |user|
        FactoryGirl.create(:task, user: user)
      end
    end
        
  end # end of factory :uncomfirmed_user
  
  #----------------------------------------------------------------------------
  # Tasks
  #----------------------------------------------------------------------------
  factory :task do |f|
    f.title                       "First task"
    f.description                 "First description"
    ##f.due_text                  (Date.today + 4).strftime('%m/%d/%Y')
    f.due                         Date.today + 4
    f.complete                    false
    association :user,            factory: :user
    
    factory :completed_due_3_days_ago do
      title                       "Completed task and due 3 days ago"
      description                 "Completed task and due 3 days ago"
      #due_text                    (Date.today - 3).strftime('%m/%d/%Y')
      due                         (Date.today - 3)
      complete                    true
    end
    
  end # end of factory :task

end # end of FactoryGirl.define
