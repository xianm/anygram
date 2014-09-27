$.FavoriteToggle = function (el, options) {
  this.$el = $(el);
  this.favorited = options.favorited || this.$el.data('favorited');
  this.submissionId = options.submissionId || this.$el.data('id');
  this.onEventEnd = options.onEventEnd;

  this.bindEvent();
};

$.FavoriteToggle.prototype.bindEvent = function () {
  this.$el.one('dblclick', this.handleEvent.bind(this));
};

$.FavoriteToggle.prototype.handleEvent = function (event) {
  event.preventDefault();

  AnyGram.clearAlert();

  $.ajax({
    url: '/api/submissions/' + this.submissionId + '/favorite',
    method: this.favorited ? 'DELETE' : 'POST',
    dataType: 'json',
    success: function () {
      this.favorited = !this.favorited;
      setTimeout(this.bindEvent.bind(this), 1000);

      if (this.onEventEnd) this.onEventEnd(this.$el, this.favorited);
    }.bind(this),

    error: function () {
      AnyGram.alert('Something went wrong!');
      this.bindEvent();
    }.bind(this)
  });
};

$.fn.favoriteToggle = function (options) {
  return this.each(function () {
    new $.FavoriteToggle(this, options);
  });
};
