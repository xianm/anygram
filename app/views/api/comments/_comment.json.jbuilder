json.(comment, :id, :created_at, :content)
json.profile_id comment.user.profile.id
json.profile_name comment.user.profile.name
