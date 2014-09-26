$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.following = options.following;
  this.userId = options.userId;

  this.render();

  this.$el.on('click', this.handleClick.bind(this));
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();

  if (this.following) {
    this.following = false;
  } else {
    this.following = true;
  }

  this.render();
};

$.FollowToggle.prototype.render = function () {
  if (this.following) {
    this.$el.text('Unfollow');
  } else {
    this.$el.text('Follow');
  }
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};
