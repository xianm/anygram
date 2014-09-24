window.AnyGram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('AnyGram.initialize');

    new AnyGram.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

