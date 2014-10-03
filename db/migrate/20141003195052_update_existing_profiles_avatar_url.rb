class UpdateExistingProfilesAvatarUrl < ActiveRecord::Migration
  def change
    Profile.update_all(avatar_url: 'https://s3-us-west-1.amazonaws.com/any-gram-prod/images/resources/avatar.png')
  end
end
