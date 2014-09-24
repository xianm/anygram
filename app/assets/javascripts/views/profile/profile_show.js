AnyGram.Views.ProfileShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['profile/show'],
  className: 'container',

  render: function () {
    var content = this.template({ profile: this.model });
    this.$el.html(content);
    return this;
  }
});
