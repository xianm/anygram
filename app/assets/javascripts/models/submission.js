AnyGram.Models.Submission = Backbone.Model.extend({
  initialize: function (options) {
    this.on('change:user_id', this.fetchUser, this);
  },

  urlRoot: '/api/submissions',

  fetchUser: function (models, options) {
    if (!this.user) {
      this.user = AnyGram.users.getOrFetch(this.get('user_id'));
    }
  },

  createdAt: function () {
    var date = new Date(this.get('created_at'));
    return date.toDateString();
  }
});
