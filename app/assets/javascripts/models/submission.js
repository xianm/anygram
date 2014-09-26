AnyGram.Models.Submission = Backbone.Model.extend({
  urlRoot: '/api/submissions',

  createdAt: function () {
    var date = new Date(this.get('created_at'));
    return date.toDateString();
  },

  submitter: function () {
    this._submitter = this._submitter || 
      new AnyGram.Models.Profile();
    return this._submitter;
  },

  favorers: function () {
    this._favorers = this._favorers ||
      new AnyGram.Collections.Profiles();
    return this._favorers;
  },

  parse: function (resp, options) {
    if (resp.submitter) {
      this.submitter().set(resp.submitter, { parse: true });
      delete resp.profile;
    }

    if (resp.favorers) {
      this.favorers().set(resp.favorers, { parse: true });
      delete resp.favorers;
    }

    return resp;
  }
});
