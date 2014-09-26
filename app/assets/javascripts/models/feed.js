AnyGram.Models.Feed = Backbone.Model.extend({
  urlRoot: '/api/feed',

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
