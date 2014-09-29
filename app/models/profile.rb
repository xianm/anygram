class Profile < ActiveRecord::Base
  SEX_OPTIONS = { unknown: 0, male: 1, female: 2 }

  validates_presence_of :name, :display_name, :sex
  validates_uniqueness_of :name, case_sensitive: false
  validates_inclusion_of :sex, in: SEX_OPTIONS.values
  validate :name, :valid_name_format

  belongs_to :user

  def valid_name_format
    unless name.match(/^[a-zA-Z\d_-]+$/)
      errors.add(:name, 'can only contain letters, numers, underscores and hyphens')
    end
  end
end
