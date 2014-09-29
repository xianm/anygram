$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.following = options.following;
  this.id = options.id;

  this.$el.on('click', this.handleClick.bind(this));

  this.render();
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();

  AnyGram.clearAlert();

  var text = this.following ? 'Unfollowing...' : 'Following...';
  this.setButtonDisabled(true, text);

  $.ajax({
    url: '/api/profiles/' + this.id + '/follow',
    method: this.following ? 'DELETE' : 'POST',
    dataType: 'json',
    success: function () {
      this.following = !this.following;
      this.$el.prop('disabled', false);
      this.render();
    }.bind(this),

    error: function () {
      AnyGram.alert('Something went wrong!');
      this.$el.prop('disabled', false);
      this.render();
    }.bind(this)
  });

};

$.FollowToggle.prototype.setButtonDisabled = function (value, text) {
  this.$el.text(text);
  this.$el.prop('disabled', value);
};

$.FollowToggle.prototype.render = function () {
  this.$el.text(this.following ? 'Unfollow' : 'Follow');
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};
