AnyGram.Views.ProfileShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:user_id', this.listenToUser);
  },

  listenToUser: function (model) {
    this.listenTo(model.user, 'sync', this.render);
  },

  template: JST['profile/show'],
  className: 'container-fluid',

  render: function () {
    var content = this.template({ 
      profile: this.model,
      user: this.model.user
    });

    this.$el.html(content);
    return this;
  }
});
