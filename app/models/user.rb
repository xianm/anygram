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

  has_many :alerts, dependent: :destroy
  has_many :out_alerts, class_name: 'Alert', foreign_key: 'from_id',
    dependent: :destroy
  
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

  def feed_submissions(limit = 7, max_created_at = nil, min_created_at = nil)
    @submissions = Submission
      .joins(:user)
      .joins('LEFT OUTER JOIN follows ON users.id = follows.user_id')
      .includes(:submitter, favorers: :profile, comments: { user: :profile })
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

    @submissions
  end

  def recommended_profiles
    Profile
      .select('profiles.*,
        COUNT(DISTINCT submissions.id) AS submissions_count,
        COUNT(DISTINCT follows.id) AS followers_count,
        CAST(COUNT(DISTINCT follows.id) AS float) / COUNT(DISTINCT submissions.id) AS weight')
      .joins(:user)
      .joins(user: :submissions)
      .joins('LEFT OUTER JOIN follows ON users.id = follows.user_id')
      .where('users.id <> :id', id: self.id)
      .group('profiles.id')
      .order('weight DESC')
  end

  def follows?(user)
    followed.include?(user)
  end

  def follow!(user)
    self.out_follows.create!(user: user)
  end

  def unfollow!(user)
    self.out_follows.find_by(user: user).destroy!
  end

  def favorited?(submission)
    favorited.include?(submission)
  end

  def favorite!(submission)
    self.favorites.create!(submission: submission)
    user = submission.user;

    if (user != self)
      user.alerts.create!(from: self, submission: submission,
                          text: "liked your picture")
    end
  end

  def unfavorite!(submission)
    self.favorites.find_by(submission: submission).destroy!
    alerts = submission.user.alerts.find_by(from: self, submission: submission,
                                   text: "liked your picture")
    alerts.destroy! if alerts
  end

  def comment_on(submission, content)
    self.comments.create!({ submission: submission, content: content })
    user = submission.user;

    if (user != self)
      user.alerts.create!(from: self, submission: submission,
                          text: "left a comment on your picture: #{ content }")
    end
  end
end
