class Profile < ActiveRecord::Base
  # complies with ISO/IEC 5218
  SEX_LOOKUP = {
    0 => 'Unknown',
    1 => 'Male',
    2 => 'Female',
    9 => 'Not Applicable'
  }

  validates :name, :display_name, :sex, presence: true
  validates :name, uniqueness: true
  validates :sex, inclusion: { in: SEX_LOOKUP.keys }
  validate :name, :valid_name_format

  belongs_to :user

  def valid_name_format
    unless name.match(/^[a-zA-Z\d_-]+$/)
      errors.add(:name, 'can only contain letters, numers, underscores and hyphens')
    end
  end
end
