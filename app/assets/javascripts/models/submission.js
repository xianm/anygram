AnyGram.Models.Submission = Backbone.Model.extend({
  urlRoot: '/api/submissions',

  createdAt: function () {
    var date = new Date(this.get('created_at'));
    return date.toDateString();
  },

  profile: function () {
    this._profile = this._profile || 
      new AnyGram.Models.Profile();
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
