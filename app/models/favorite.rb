class Favorite < ActiveRecord::Base
  validates_presence_of :user, :submission
  validates_uniqueness_of :submission, scope: :user

  belongs_to :submission
  belongs_to :user
end
