AnyGram.Collections.Users = Backbone.Collection.extend({
  url: '/users',
  model: AnyGram.Models.User
});

AnyGram.users = new AnyGram.Collections.Users();
