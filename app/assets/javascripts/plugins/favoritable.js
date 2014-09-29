$.Favoritable = function (el, model, options) {
  this.$el = $(el);
  this.model = model;
  this.event = options.event || 'click';
  this.onEventBegin = options.onEventBegin;

  this.$el.on(this.event, this.handleEvent.bind(this));
};

$.Favoritable.prototype.handleEvent = function (event) {
  event.preventDefault();

  var favorited = this.model.get('favorited');

  // Set the models state to what we **hope** it will succeed to, and revert it
  // only on failure. This is so we can handle eventBegin to animate things
  // quickly, to make it look instantaneous to the user.
  this.setFavorited(!favorited);

  if (this.onEventBegin) this.onEventBegin(!favorited);

  $.ajax({
    url: '/api/submissions/' + this.model.id + '/favorite',
    method: favorited ? 'DELETE' : 'POST',
    dataType: 'json',
    error: function () {
      this.setFavorited(favorited);
    }.bind(this)
  });
};

$.Favoritable.prototype.setFavorited = function (favorited) {
  this.model.set({ favorited: favorited });

  if (favorited) {
    this.model.favorers().add(AnyGram.currentUser.profile());
  } else {
    this.model.favorers().remove(AnyGram.currentUser.profile());
  }
};

$.fn.favoritable = function (model, options) {
  return this.each(function () {
    new $.Favoritable(this, model, options);
  });
};
