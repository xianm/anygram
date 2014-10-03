AnyGram.Views.ProfileExplorer = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, 'add', this.addProfile);

    this.fetchProfiles();
  },

  template: JST['profile/explorer'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  fetchProfiles: function () {
    var view = this;
    var options = {
      url: '/api/explore_profiles',
      dataType: 'json',
      success: function (data) {
        view.collection.add(data);
      }
    };

    $.ajax(options);
  },

  addProfile: function (profile) {
    var view = new AnyGram.Views.ProfileOverview({
      model: profile
    });

    this.addSubview('#profiles', view);
  }
});
