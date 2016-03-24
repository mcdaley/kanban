#------------------------------------------------------------------------------
# spec/factories/factories.rb
#------------------------------------------------------------------------------

FactoryGirl.define do

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

end # end of FactoryGirl.define
