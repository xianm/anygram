window.AnyGram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    new AnyGram.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
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
    return $root.append($el).show();
  },

  clearAlert: function (selector) {
    var $el = $(selector || '#default-alerts');
    return $el.empty().hide();
  }
};
