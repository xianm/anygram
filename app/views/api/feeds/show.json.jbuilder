json.submissions @feed_submissions do |submission|
  json.partial!('api/submissions/submission', submission: submission)

  json.comments submission.comments.last(3) do |comment|
    json.partial!('api/comments/comment', comment: comment)
  end

  json.remaining_comments_count [0, submission.comments.count - 3].max
end
