json.(submission, :id, :created_at, :caption)

json.time_ago time_ago_in_words(submission.created_at)
json.url submission.source.url
json.thumb_url submission.source.url(:thumb)
json.favorited @current_user_favorites.include?(submission.id)

json.submitter submission.submitter, :id, :name, :display_name, :avatar_url

json.favorers submission.favorers do |favorer|
  json.id favorer.profile.id
  json.name favorer.profile.name
  json.display_name favorer.profile.display_name
end
