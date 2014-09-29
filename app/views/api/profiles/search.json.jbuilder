json.results @profiles do |profile|
  json.(profile, :id, :user_id, :name, :display_name)
end
