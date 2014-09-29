class Comment < ActiveRecord::Base
  validates_presence_of :user_id, :submission_id, :content

  belongs_to :user
  belongs_to :submission
end
