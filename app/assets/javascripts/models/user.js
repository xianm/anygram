AnyGram.Models.User = Backbone.Model.extend({
  urlRoot: '/users',

  profile: function () {
    this._profile = this._profile || new AnyGram.Models.Profile();
    return this._profile;
  },

  parse: function (resp, options) {
    if (resp.profile) {
      this.profile().set(resp.profile, { parse: true });
      delete resp.profile;
    }

    return resp;
  }
});
