json.array! @profiles do |profile|
  json.(profile, :id, :name, :display_name, :bio, :location, :sex, :submissions_count, :followers_count)
  json.following current_user.follows?(profile.user)
  json.followed_count profile.user.followed.count
end
