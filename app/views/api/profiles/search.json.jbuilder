json.results @profiles do |profile|
  json.(profile, :id, :name, :display_name)
end
