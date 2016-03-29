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
        FactoryGirl.create( :task,                            user: user )
        FactoryGirl.create( :completed_due_3_days_ago,        user: user )
        FactoryGirl.create( :completed_due_1_day_ago,         user: user )
        FactoryGirl.create( :completed_due_today,             user: user )
        FactoryGirl.create( :completed_due_today,             user: user )
        FactoryGirl.create( :completed_due_1_day_from_now,    user: user )
        FactoryGirl.create( :completed_due_7_days_from_now,   user: user )
        FactoryGirl.create( :incomplete_due_5_days_from_now,  user: user )
        FactoryGirl.create( :incomplete_due_today,            user: user )
        FactoryGirl.create( :incomplete_due_1_day_ago,        user: user )
        FactoryGirl.create( :incomplete_due_3_days_ago,       user: user )
        FactoryGirl.create( :incomplete_due_5_days_ago ,      user: user )
      end
    end
        
  end # end of factory :uncomfirmed_user
  
  #----------------------------------------------------------------------------
  # Tasks
  #----------------------------------------------------------------------------
  factory :task do |f|
    f.title                       "First task"
    f.description                 "First description"
    f.due_text                    (Date.today + 4).strftime('%m/%d/%Y')
    f.complete                    false
    association :user,            factory: :user
    
    factory :completed_due_3_days_ago do
      title                       "Title - Completed task and due 3 days ago"
      description                 "Completed task and due 3 days ago"
      due_text                    (Date.today - 3).strftime('%m/%d/%Y')
      complete                    true
    end
    
    factory :completed_due_1_day_ago do
      title                       "Title - Completed task and due 1 day ago"
      description                 "Completed task and due 1 day ago"
      due_text                    (Date.today - 1).strftime('%m/%d/%Y')
      complete                    true
    end

    factory :completed_due_today do
      title                       "Title - Completed task and due today"
      description                 "Completed task and due today"
      due_text                    (Date.today).strftime('%m/%d/%Y')
      complete                    true
    end

    factory :completed_due_1_day_from_now do
      title                       "Title - Completed task and due tomorrow"
      description                 "Completed task and due tomorrow"
      due_text                    (Date.today + 1).strftime('%m/%d/%Y')
      complete                    true
    end
    
    factory :completed_due_7_days_from_now do
      title                       "Title - Completed task and due in 7 days"
      description                 "Completed task and due in 7 days"
      due_text                    (Date.today + 7).strftime('%m/%d/%Y')
      complete                    true
    end

    factory :incomplete_due_5_days_from_now do
      title                       "Title - Incomplete task and due in 5 days"
      description                 "Incomplete task and due in 5 days"
      due_text                    (Date.today + 5).strftime('%m/%d/%Y')
      complete                    false
    end

    factory :incomplete_due_today do
      title                       "Title - Incomplete task and due today"
      description                 "Incomplete task and due today"
      due_text                    (Date.today).strftime('%m/%d/%Y')
      complete                    false
    end

    factory :incomplete_due_1_day_ago do
      title                       "Title - Incomplete task and due 1 day ago"
      description                 "Incomplete task and due 1 day ago"
      due_text                    (Date.today - 1).strftime('%m/%d/%Y')
      complete                    false
    end
    
    factory :incomplete_due_3_days_ago do
      title                       "Title - Incomplete task and due 3 days ago"
      description                 "Incomplete task and due 3 days ago"
      due_text                    (Date.today - 3).strftime('%m/%d/%Y')
      complete                    false
    end

    factory :incomplete_due_5_days_ago do
      title                       "Title - Incomplete task and due 5 days ago"
      description                 "Incomplete task and due 5 days ago"
      due_text                    (Date.today - 5).strftime('%m/%d/%Y')
      complete                    false
    end    
  end # end of factory :task

end # end of FactoryGirl.define
