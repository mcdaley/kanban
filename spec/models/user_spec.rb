# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  name                   :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#

#------------------------------------------------------------------------------
# spec/models/user_spec.rb
#------------------------------------------------------------------------------
describe User do

  describe "accessible fields" do
    it { is_expected.to have_db_column(         :name                   ) }
    it { is_expected.to have_db_column(         :encrypted_password     ) }
    it { is_expected.to have_db_column(         :reset_password_token   ) }
    it { is_expected.to have_db_column(         :reset_password_sent_at ) }
    it { is_expected.to have_db_column(         :remember_created_at    ) }
    it { is_expected.to have_db_column(         :sign_in_count          ) }
    it { is_expected.to have_db_column(         :current_sign_in_at     ) }
    it { is_expected.to have_db_column(         :last_sign_in_at        ) }
    it { is_expected.to have_db_column(         :current_sign_in_ip     ) }
    it { is_expected.to have_db_column(         :last_sign_in_ip        ) }
    it { is_expected.to have_db_column(         :created_at             ) }
    it { is_expected.to have_db_column(         :updated_at             ) }
    it { is_expected.to have_db_column(         :confirmation_token     ) }
    it { is_expected.to have_db_column(         :confirmed_at           ) }
    it { is_expected.to have_db_column(         :confirmation_sent_at   ) }
    it { is_expected.to have_db_column(         :unconfirmed_email      ) }
    it { is_expected.to have_db_column(         :email                  ) }
    
    it { is_expected.to allow_value("").for(    :name                   ) }
    it { is_expected.to validate_presence_of(   :email                  ) }
    it { is_expected.to validate_uniqueness_of( :email ).case_insensitive }
    it { is_expected.to have_many(              :tasks                  ) }
  end # end of describe "accessible fields"
  
  describe "unconfirmed user" do
    let(:unconfirmed_user) { FactoryGirl.build(:unconfirmed_user) }
        
    it "does not require a name" do
      expect( FactoryGirl.build(:unconfirmed_user, name: "") ).to be_valid
    end
    
    it "should not accept invalid email addresses" do
      invalid_addresses = %w[user@foo,com user_at_foo.org example.user@foo.]
      invalid_addresses.each do |address|
        expect( FactoryGirl.build(:unconfirmed_user, email: address) ).to be_invalid
      end
    end
    
  end # end of describe "unconfirmed user"
  
  describe "confirmed user" do
    let(:user) { FactoryGirl.create(:user) }
    
    it { expect(user.name).to   eq( "Thurmon Thomas" ) }
    it { expect(user.email).to  eq( "thurmon.thomas@bills.com" ) }
  end # end of describe "confirmed user"
  
end # end of describe User
