class Follow < ActiveRecord::Base
  validates :user, :follower, presence: true
  validates :follower, uniqueness: { scope: :user }

  belongs_to :user
  belongs_to :follower, class_name: 'User'
end
