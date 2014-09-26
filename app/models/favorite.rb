class Favorite < ActiveRecord::Base
  validates :user, :submission, presence: true
  validates :submission, uniqueness: { scope: :user }

  belongs_to :submission
  belongs_to :user
end
