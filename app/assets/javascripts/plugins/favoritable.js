$.Favoritable = function (el, model, options) {
  this.$el = $(el);
  this.model = model;
  this.event = options.event || 'click';
  this.onEventEnd = options.onEventEnd;

  this.bindEvent();
};

$.Favoritable.prototype.bindEvent = function () {
  this.$el.one(this.event, this.handleEvent.bind(this));
};

$.Favoritable.prototype.handleEvent = function (event) {
  event.preventDefault();

  AnyGram.clearAlert();

  var favorited = this.model.get('favorited');

  $.ajax({
    url: '/api/submissions/' + this.model.id + '/favorite',
    method: favorited ? 'DELETE' : 'POST',
    dataType: 'json',
    success: function () {
      favorited = !favorited;
      this.model.set({ favorited: favorited });

      if (favorited) {
        this.model.favorers().add(AnyGram.currentUser.profile());
      } else {
        this.model.favorers().remove(AnyGram.currentUser.profile());
      }

      setTimeout(this.bindEvent.bind(this), 200);

      if (this.onEventEnd) this.onEventEnd(favorited);
    }.bind(this),

    error: function () {
      AnyGram.alert('Something went wrong!');
      this.bindEvent();
    }.bind(this)
  });
};

$.fn.favoritable = function (model, options) {
  return this.each(function () {
    new $.Favoritable(this, model, options);
  });
};
