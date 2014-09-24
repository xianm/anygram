window.AnyGram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new AnyGram.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

