class Submission < ActiveRecord::Base
  has_attached_file :source
  validates_attachment_content_type :source, content_type: /\Aimage.*\Z/

  belongs_to :user
  has_one :submitter, through: :user, source: :profile

  has_many :favorites, dependent: :destroy
  has_many :favorers, through: :favorites, source: :user
end
