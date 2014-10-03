class ChangeAvatarUrlToAddDefaultValueInProfiles < ActiveRecord::Migration
  def change
    change_column :profiles, :avatar_url, :string, default: "https://s3-us-west-1.amazonaws.com/any-gram-prod/images/resources/avatar.png"
  end
end
