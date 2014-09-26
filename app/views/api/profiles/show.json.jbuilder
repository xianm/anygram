json.(@profile, :id, :user_id, :name, :display_name, :description, :location,
      :sex, :created_at, :updated_at)

json.submissions @profile.user.submissions do |submission|
  json.(submission, :id, :created_at)
  json.url submission.source.url
end

json.following current_user.follows?(@profile.user)
