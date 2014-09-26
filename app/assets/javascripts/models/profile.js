AnyGram.Models.Profile = Backbone.Model.extend({
  urlRoot: '/api/profiles',

  linkTo: function () {
    return "<a href='#/profiles/" + this.id + "'>" + 
      this.escape('name') +
      '</a>';
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
  },

  submissions: function () {
    this._submissions = this._submissions || 
      new AnyGram.Collections.Submissions();
    return this._submissions;
  },

  parse: function (resp, options) {
    if (resp.submissions) {
      this.submissions().set(resp.submissions, { parse: true });
      delete resp.submissions;
    }

    return resp;
  }
});
