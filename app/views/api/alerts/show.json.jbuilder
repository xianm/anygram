json.array! @alerts do |alert|
  json.(alert, :created_at, :text, :read)

  json.from do
    json.id alert.from_id
    json.name alert.from.profile.name
    json.avatar alert.from.profile.avatar_url
  end

  json.submission do
    json.id alert.submission_id
    json.url alert.submission.source.url(:thumb)
  end
end
