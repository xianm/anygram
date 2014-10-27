class Alert < ActiveRecord::Base
  validates_presence_of :user, :from, :text

  belongs_to :user
  belongs_to :from, class_name: 'User'
  belongs_to :submission
end
