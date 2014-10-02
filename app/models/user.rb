class User < ActiveRecord::Base
  validates_presence_of :email, :password_digest, :session_token, :profile
  validates_uniqueness_of :email, case_sensitive: false
  validates_uniqueness_of :session_token, uniqueness: true
  validates_length_of :password, minimum: 6, allow_nil: true

  has_one :profile, autosave: true, dependent: :destroy
  has_many :submissions, dependent: :destroy

  has_many :in_follows, class_name: 'Follow', dependent: :destroy
  has_many :out_follows, class_name: 'Follow', foreign_key: 'follower_id',
    dependent: :destroy
  has_many :followers, through: :in_follows, source: :follower
  has_many :followed, through: :out_follows, source: :user

  has_many :favorites, dependent: :destroy
  has_many :favorited, through: :favorites, source: :submission

  has_many :comments, dependent: :destroy
  
  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.where('LOWER(email) = ?', email.downcase).first
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

  def feed_submissions(limit = 7, max_created_at = nil, min_created_at = nil)
    @submissions = Submission
      .joins(:user)
      .joins('LEFT OUTER JOIN follows ON users.id = follows.user_id')
      .where('submissions.user_id = :id OR follows.follower_id = :id', id: self.id)
      .order('submissions.created_at DESC')
      .uniq

    if limit
      @submissions = @submissions.limit(limit)
    end

    if max_created_at
      @submissions = @submissions.where('submissions.created_at < ?', max_created_at)
    end

    if min_created_at
      @submissions = @submissions.where('submissions.created_at > ?', min_created_at)
    end

    @submissions.includes(:submitter, :favorers)
  end

  def favorited?(submission)
    favorited.include?(submission)
  end

  def favorite!(submission_id)
    self.favorites.create!(submission_id: submission_id)
  end

  def unfavorite!(submission_id)
    self.favorites.find_by(submission_id: submission_id).destroy!
  end

  def comment_on(submission_id, content)
    self.comments.create!({ submission_id: submission_id, content: content })
  end
end
