json.(@submission, :id, :user_id, :created_at)

json.url @submission.source.url
json.favorited current_user.favorited?(@submission)

json.profile @submission.user.profile
