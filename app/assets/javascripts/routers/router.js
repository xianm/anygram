AnyGram.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'index',
    'profiles/:id' : 'show',
    'edit_profile' : 'edit'
  },

  index: function () {
    this.$rootEl.html('TODO: Image Feed');
  },

  show: function (id) {
    var view = new AnyGram.Views.ProfileShow({
      model: AnyGram.profiles.getOrFetch(id)
    });
    this.changeView(view);
  },

  edit: function () {
    var view = new AnyGram.Views.ProfileEdit({
      model: AnyGram.profiles.getOrFetch(AnyGram.currentUserId)
    });
    this.changeView(view);
  }
});
