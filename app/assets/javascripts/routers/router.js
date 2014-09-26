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
    var feed = new AnyGram.Models.Feed();
    feed.fetch();

    var view = new AnyGram.Views.FeedShow({
      model: feed,
      collection: feed.submissions()
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
