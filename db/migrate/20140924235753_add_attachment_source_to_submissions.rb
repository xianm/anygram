class AddAttachmentSourceToSubmissions < ActiveRecord::Migration
  def self.up
    change_table :submissions do |t|
      t.attachment :source
    end
  end

  def self.down
    remove_attachment :submissions, :source
  end
end
