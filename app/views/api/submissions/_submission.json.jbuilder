json.(submission, :id, :user_id, :created_at)

json.time_ago time_ago_in_words(submission.created_at)
json.url submission.source.url
json.favorited current_user.favorited?(submission)

json.submitter submission.submitter, :id, :user_id, :name, :display_name

json.favorers submission.favorers do |favorer|
  json.id favorer.profile.id
  json.user_id favorer.profile.user_id
  json.name favorer.profile.name
  json.display_name favorer.profile.display_name
end
