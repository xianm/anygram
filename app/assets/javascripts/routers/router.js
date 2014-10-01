AnyGram.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'showFeed',
    'profiles/:id': 'showProfile',
    'edit_profile': 'editProfile',
    'upload': 'newSubmission',
    'view/:id': 'showSubmission'
  },

  showFeed: function () {
    var view = new AnyGram.Views.FeedShow({
      collection: new AnyGram.Collections.Submissions()
    });
    this.changeView(view);
  },

  showProfile: function (id) {
    var profile = AnyGram.profiles.getOrFetch(id);
    var view = new AnyGram.Views.ProfileShow({
      model: profile,
      collection: profile.submissions()
    });
    this.changeView(view);
  },

  editProfile: function () {
    var view = new AnyGram.Views.ProfileEdit({
      model: AnyGram.currentUser.profile()
    });
    this.changeView(view);
  },

  newSubmission: function () {
    var view = new AnyGram.Views.SubmissionNew({
      model: new AnyGram.Models.Submission()
    });
    this.changeView(view);
  },

  showSubmission: function (id) {
    var view = new AnyGram.Views.SubmissionShow({ 
      model: AnyGram.submissions.getOrFetch(id)
    });
    this.changeView(view);
  }
});
