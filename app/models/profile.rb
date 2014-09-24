class Profile < ActiveRecord::Base
  # complies with ISO/IEC 5218
  SEX_LOOKUP = {
    0 => 'Unknown',
    1 => 'Male',
    2 => 'Female',
    9 => 'Not Applicable'
  }

  validates :name, :display_name, :sex, null: false
  validates :name, uniqueness: true
  validatse :sex, inclusion: { in: SEX_LOOKUP.keys }
  validate :name, :valid_name_format

  belongs_to :user

  def to_param
    name
  end

  def sex
    SEX_LOOKUP[@sex]
  end

  def valid_name_format
    unless name.match(/^[a-zA-Z][a-zA-Z\d_-]+$/)
      errors.add(:name, 'must start with a letter, and can only contain letters,
                 numers, underscores and hyphens')
    end
  end
end
