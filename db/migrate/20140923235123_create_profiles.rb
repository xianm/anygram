class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.string :display_name, null: false
      t.text :description
      t.string :location
      t.integer :sex, default: 0, null: false

      t.timestamps
    end

    add_index :profiles, :user_id
    add_index :profiles, :name, unique: true
  end
end
