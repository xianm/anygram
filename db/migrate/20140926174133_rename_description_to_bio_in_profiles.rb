class RenameDescriptionToBioInProfiles < ActiveRecord::Migration
  def change
    rename_column :profiles, :description, :bio
  end
end
