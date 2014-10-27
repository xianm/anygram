class Submission < ActiveRecord::Base
  has_attached_file :source, styles: { original: "512x512", thumb: "200x200" }
  validates_attachment_content_type :source, content_type: /\Aimage.*\Z/

  belongs_to :user
  has_one :submitter, through: :user, source: :profile

  has_many :favorites, dependent: :destroy
  has_many :favorers, through: :favorites, source: :user

  has_many :comments, dependent: :destroy

  has_many :alerts, dependent: :destroy
end
