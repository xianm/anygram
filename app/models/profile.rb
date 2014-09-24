class Profile < ActiveRecord::Base
  SEX_OPTIONS = { unknown: 0, male: 1, female: 2 }

  validates :name, :display_name, :sex, presence: true
  validates :name, uniqueness: true
  validates :sex, inclusion: { in: SEX_OPTIONS.values }
  validate :name, :valid_name_format

  belongs_to :user

  def valid_name_format
    unless name.match(/^[a-zA-Z\d_-]+$/)
      errors.add(:name, 'can only contain letters, numers, underscores and hyphens')
    end
  end
end
