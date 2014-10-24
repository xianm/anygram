AnyGram.Collections.Submissions = Backbone.Collection.extend({
  model: AnyGram.Models.Submission,
});

AnyGram.submissions = new AnyGram.Collections.Submissions();
