AnyGram.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'profiles/:id': 'show',
    'edit_profile': 'edit',
    'upload': 'newSubmission',
    'view/:id': 'showSubmission'
  },

  index: function () {
    this.$rootEl.text('TODO: Feed');
  },

  show: function (id) {
    var view = new AnyGram.Views.ProfileShow({
      model: AnyGram.profiles.getOrFetch(id)
    });
    this.changeView(view);
  },

  edit: function () {
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
