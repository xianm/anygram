json.(@submission, :id, :user_id, :created_at)

json.url @submission.source.url

json.profile @submission.user.profile
