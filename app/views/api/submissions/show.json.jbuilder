json.partial! 'api/submissions/submission', submission: @submission
json.comments @submission.comments do |comment|
  json.partial! 'api/comments/comment', comment: comment
end
