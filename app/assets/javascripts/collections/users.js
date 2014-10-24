AnyGram.Collections.Users = Backbone.Collection.extend({
  model: AnyGram.Models.User
});

AnyGram.users = new AnyGram.Collections.Users();
