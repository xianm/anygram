AnyGram.Views.FeedShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);

    this.model.fetch();
  },

  template: JST['feed/show'],
  className: 'container-fluid',

  render: function () {
    var content = this.template({
      submissions: this.model.submissions()
    });
    this.$el.html(content);
    return this;
  }
});
