class ChanceAlertsTextColumnType < ActiveRecord::Migration
  def change
    change_column :alerts, :text, :text
  end
end
