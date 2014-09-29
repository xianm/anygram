json.submissions @feed_submissions do |submission|
  json.partial!('api/submissions/submission', submission: submission)
  json.comments submission.comments.limit(3)
  json.remaining_comments_count submission.comments.count - 3
end
