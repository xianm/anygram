AnyGram.Views.SubmissionFeed = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['submission/feed'],
  className: 'row',

  render: function () {
    var content = this.template({
      submission: this.model
    });
    this.$el.html(content);
    return this;
  }
});
