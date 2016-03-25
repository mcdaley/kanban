class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string        :title
      t.string        :description
      t.datetime      :due
      t.boolean       :complete,      default: false
      t.integer       :user_id

      t.timestamps    null: false
    end
  end
end
