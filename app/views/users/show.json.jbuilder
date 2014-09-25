json.(@user, :id)

json.profile @user.profile

#json.submissions @user.submissions do |submission|
  #json.id submission.id
  #json.user_id submission.user_id
  #json.created_at submission.created_at
  #json.url submission.source.url
#end
