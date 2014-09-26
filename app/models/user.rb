class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, :profile, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_one :profile, autosave: true, dependent: :destroy
  has_many :submissions, dependent: :destroy

  has_many :in_follows, class_name: 'Follow'
  has_many :out_follows, class_name: 'Follow', foreign_key: 'follower_id'
  has_many :followers, through: :in_follows, source: :follower
  has_many :followed, through: :out_follows, source: :user
  
  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    (user.nil? || !user.is_password?(password)) ? nil : user
  end

  def self.generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_token
  end

  def reset_session_token!
    self.update!(session_token: User.generate_token)
    self.session_token
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def follows?(user)
    followed.include?(user)
  end

  def feed_submissions
    @submissions = Submission
      .joins(:user)
      .joins('LEFT OUTER JOIN follows ON users.id = follows.user_id')
      .where('submissions.user_id = :id OR follows.follower_id = :id', id: self.id)
      .order('submissions.created_at DESC')
      .uniq

    @submissions.includes(:profile)
  end
end
