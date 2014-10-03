class AddLowerEmailIndexToUsers < ActiveRecord::Migration
  def up
    remove_index :users, :email
    execute <<-SQL
      CREATE UNIQUE INDEX
        lower_email_index_users
      ON
        users(LOWER(email))
    SQL
  end

  def down
    execute "DROP INDEX IF EXISTS lower_email_index_users"
    add_index :users, :email, unique: true
  end
end
