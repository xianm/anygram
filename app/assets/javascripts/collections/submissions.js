AnyGram.Collections.Submissions = Backbone.Collection.extend({
  url: '/api/submissions',
  model: AnyGram.Models.Submission,
});

AnyGram.submissions = new AnyGram.Collections.Submissions();
