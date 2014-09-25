AnyGram.Models.Profile = Backbone.Model.extend({
  initialize: function (options) {
    this.user = options.user;
    this.on('change:user_id', this.fetchUser, this);
  },

  urlRoot: '/api/profiles',

  fetchUser: function (models, options) {
    this.user = this.user || AnyGram.users.getOrFetch(this.get('user_id'));
  },

  sexSymbol: function () {
    switch (this.get('sex')) {
      case 0: return '?';
      case 1: return '&#x2642;';
      case 2: return '&#x2640;';
    }
  },

  location: function () {
    if (this.get('location')) {
      return this.escape('location');
    } else {
      return 'Unknown';
    }
  }
});
