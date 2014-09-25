class Submission < ActiveRecord::Base
  has_attached_file :source
  validates_attachment_content_type :source, content_type: /\Aimage.*\Z/

  belongs_to :user
end
