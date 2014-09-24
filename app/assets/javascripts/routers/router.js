AnyGram.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'index',
    'profile/:id' : 'show'
  },

  index: function () {
    console.log('Router::index');
  },

  show: function (id) {
    var view = new AnyGram.Views.ProfileShow({
      model: AnyGram.profiles.getOrFetch(id)
    });
    this.changeView(view);
  }
});
