window.AnyGram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    AnyGram.currentUser = AnyGram.users.getOrFetch(AnyGram.currentUserId, {
      success: function () {
        var router = new AnyGram.Routers.Router({ $rootEl: $('#content') });

        // This gets called before every route action is called
        Backbone.history.on('route', function () {
          AnyGram.clearAlert();
        });
        
        if (!Backbone.history.start()) {
          AnyGram.notFound();
        }
      }
    });
  },

  notFound: function () {
    Backbone.history.navigate('/', { 
      trigger: true,
      replace: true
    });

    AnyGram.alert("Oops! That page doesn't exist.");
  },

  alert: function (alerts, options) {
    alerts = [].concat(alerts);
    var selector = '#default-alerts';
    var type = 'danger';

    if (options) {
      selector = options.selector || selector;
      type = options.type || type;
    }


    var $root = AnyGram.clearAlert(selector);
    var $el = $('<div>').addClass('alert alert-' + type);
    var $ul = $('<ul>');

    alerts.forEach(function (item) {
      $ul.append($('<li>').text(item));
    });

    $el.append($ul);
    $root.append($el).show();
  },

  clearAlert: function (selector) {
    var $el = $(selector || '#default-alerts');
    return $el.empty().hide();
  }
};

$(document).ajaxError(function (e, xhr, settings, exception) {
  if (xhr.status === 404) {
    AnyGram.notFound();
  }
});
