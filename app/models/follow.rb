class Follow < ActiveRecord::Base
  validates_presence_of :user, :follower
  validates_uniqueness_of :follower, scope: :user

  belongs_to :user
  belongs_to :follower, class_name: 'User'
end
