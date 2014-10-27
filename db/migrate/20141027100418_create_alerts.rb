class CreateAlerts < ActiveRecord::Migration
  def change
    create_table :alerts do |t|
      t.integer :user_id, null: false
      t.integer :from_id, null: false
      t.integer :submission_id, null: false
      t.string :text, null: false
      t.boolean :read, default: false

      t.timestamps
    end
    add_index :alerts, :user_id
  end
end
