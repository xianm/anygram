$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.setFollowState(options.following);
  this.id = options.id;
  this.callback = options.callback;

  this.$el.on('click', this.handleClick.bind(this));
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();

  this.setButtonDisabled(true);
  this.setFollowState(!this.following);

  $.ajax({
    url: '/api/profiles/' + this.id + '/follow',
    method: this.following ? 'POST' : 'DELETE',
    dataType: 'json',
    success: function () {
      this.setButtonDisabled(false);
      if (this.callback) this.callback(this.following);
    }.bind(this),

    error: function () {
      this.setFollowState(!this.following);
      this.setButtonDisabled(false);
    }.bind(this)
  });
};

$.FollowToggle.prototype.setButtonDisabled = function (value) {
  this.$el.prop('disabled', value);
};

$.FollowToggle.prototype.setFollowState = function (following) {
  this.following = following;

  var text = following ? 'Unfollow' : 'Follow';
  var cssClass = following ? 'following' : 'not-following';

  this.$el.removeClass('following not-following');
  this.$el.addClass(cssClass);
  this.$el.text(text);
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};
