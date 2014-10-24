$.Commentable = function (el, model, options) {
  this.$el = $(el);
  this.model = model;

  this.$el.on('submit', this.onFormSubmit.bind(this));
};

$.Commentable.prototype.onFormSubmit = function (event) {
  event.preventDefault();

  var payload = $(event.target).serializeJSON();
  payload.comment.profile_id = AnyGram.currentUser.profile().id;
  payload.comment.profile_name = AnyGram.currentUser.profile().get('name');
  payload.comment.profile_avatar_url = AnyGram.currentUser.profile().get('avatar_url');

  var comment = this.model.comments().add(payload.comment);

  $.ajax({
    url: '/api/submissions/' + this.model.id + '/comment',
    method: 'POST',
    dataType: 'json',
    data: payload,
    error: function () {
      this.model.comments().remove(comment);
    }.bind(this)
  });
};

$.fn.commentable = function (model, options) {
  return this.each(function () {
    new $.Commentable(this, model, options);
  });
};
