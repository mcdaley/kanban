# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  title       :string
#  description :string
#  due         :datetime
#  complete    :boolean          default("f")
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Task, type: :model do

  describe "accessible fields" do
    it { is_expected.to     have_db_column(       :title                ) }
    it { is_expected.to     have_db_column(       :description          ) }
    it { is_expected.to     have_db_column(       :due                  ) }
    it { is_expected.to     have_db_column(       :complete             ) }
    it { is_expected.to     have_db_column(       :user_id              ) }
    it { is_expected.to     have_db_column(       :created_at           ) }
    it { is_expected.to     have_db_column(       :updated_at           ) }
    
    it { is_expected.to     validate_presence_of( :title                ) }
    it { is_expected.to     validate_length_of(   :title).is_at_least(1)  }
    it { is_expected.to     validate_length_of(   :title).is_at_most(255) }
    
    it { is_expected.to     allow_value("").for(  :description          ) }
    
    it { is_expected.to     allow_value("").for(          :due_text     ) }
    it { is_expected.to     allow_value("04/05/16").for(  :due_text     ) }
    it { is_expected.to_not allow_value("20/05/17").for(  :due_text     ) }
    it { is_expected.to_not allow_value("hello").for(     :due_text     ) }
    
    it { is_expected.to belong_to(                :user                 ) }
  end # end of describe "accessible fields"

=begin  
  describe "invalid tasks" do
    let(:user)      { FactoryGirl.create(:user)               }
    let(:task)      { FactoryGirl.create(:task, user: user)   }
  end # end of describe "invalid tasks"
=end  
  
  describe "valid tasks" do
    let(:user)      { FactoryGirl.create(:user)               }
    let(:task)      { FactoryGirl.create(:task, user: user)   }
    let(:due)       { (Date.today + 4)                        }
    
    it "Saves a valid tasks" do
      expect(task.title).to         eq( "First task"          )
      expect(task.description).to   eq( "First description"   )
      expect(task.due.year).to      eq( due.year              )
      expect(task.due.month).to     eq( due.month             )
      expect(task.due.day).to       eq( due.day               )
      expect(task.complete).to      eq( false                 )
    end
  end # end of describe "valid tasks"

end # end of describe Task
