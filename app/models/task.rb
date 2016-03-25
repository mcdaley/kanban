##
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

class Task < ActiveRecord::Base
  belongs_to    :user
  
  validates     :title,     presence:   true,
                            length:     { within:   1..255 }
                          
  validates     :complete,  inclusion:  { in:       [true, false] }
end
