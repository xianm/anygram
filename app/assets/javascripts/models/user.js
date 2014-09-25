AnyGram.Models.User = Backbone.Model.extend({
  urlRoot: '/users',

  profile: function () {
    this._profile = this._profile || new AnyGram.Models.Profile({ user: this });
    return this._profile;
  },

  submissions: function () {
    this._submissions = this._submissions || 
      new AnyGram.Collections.Submissions([], { user: this });
    return this._submissions;
  },

  parse: function (resp, options) {
    if (resp.profile) {
      this.profile().set(resp.profile, { parse: true });
      delete resp.profile;
    }

    if (resp.submissions) {
      this.submissions().set(resp.submissions, { parse: true });
      delete resp.submissions;
    }

    return resp;
  }
});
