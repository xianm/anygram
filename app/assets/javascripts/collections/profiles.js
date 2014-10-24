AnyGram.Collections.Profiles = Backbone.Collection.extend({
  model: AnyGram.Models.Profile
});

AnyGram.profiles = new AnyGram.Collections.Profiles();
