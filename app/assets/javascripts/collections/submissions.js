AnyGram.Collections.Submissions = Backbone.Collection.extend({
  initialize: function (models, options) {
    if (options) {
      this.user =  options.user;
    }
  },

  url: '/api/submissions',
  model: AnyGram.Models.Submission
});

AnyGram.submissions = new AnyGram.Collections.Submissions();
