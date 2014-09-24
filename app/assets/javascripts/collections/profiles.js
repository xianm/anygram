AnyGram.Collections.Profiles = Backbone.Collection.extend({
  url: '/api/profiles',
  model: AnyGram.Models.Profile,

  getOrFetch: function (id) {
    var profile = this.get(id);

    if (profile) {
      profile.fetch();
    } else {
      profile = new AnyGram.Models.Profile({ id: id });

      profile.fetch({ 
        success: function () {
          this.add(profile);
        }.bind(this)
      });
    }

    return profile;
  }
});

AnyGram.profiles = new AnyGram.Collections.Profiles();
