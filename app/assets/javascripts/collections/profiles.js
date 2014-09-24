AnyGram.Collections.Profiles = Backbone.Collection.extend({
  url: '/api/profiles',
  model: AnyGram.Models.Profile
});

AnyGram.profiles = new AnyGram.Collections.Profiles();
