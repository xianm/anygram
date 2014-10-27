window.AnyGram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    AnyGram.currentUser = AnyGram.users.getOrFetch(AnyGram.currentUserId, {
      success: AnyGram.start.bind(this)
    });
  },

  start: function () {
    var router = new AnyGram.Routers.Router({ $rootEl: $('#content') });

    // This gets called before every route action is called
    Backbone.history.on('route', function () {
      window.scrollTo(0, 0);
    });
    
    if (!Backbone.history.start()) {
      AnyGram.notFound();
    }

    $('#search-bar').searchable({
      results: '#search-results'
    });

    $('#alerts').alerts();
  },

  notFound: function () {
    Backbone.history.navigate('/', { 
      trigger: true,
      replace: true
    });
  },
};

$(document).ajaxError(function (e, xhr, settings, exception) {
  if (xhr.status === 404) {
    AnyGram.notFound();
  }
});
