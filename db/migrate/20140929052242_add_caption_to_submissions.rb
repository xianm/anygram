class AddCaptionToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :caption, :text
  end
end
