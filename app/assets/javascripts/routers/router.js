AnyGram.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'profiles/:id': 'showProfile',
    'edit_profile': 'editProfile',
    'upload': 'newSubmission',
    'view/:id': 'showSubmission'
  },

  index: function () {
    var view = new AnyGram.Views.FeedShow({
      model: new AnyGram.Models.Feed()
    });
    this.changeView(view);
  },

  showProfile: function (id) {
    var view = new AnyGram.Views.ProfileShow({
      model: AnyGram.profiles.getOrFetch(id)
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
