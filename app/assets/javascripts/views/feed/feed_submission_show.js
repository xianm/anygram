AnyGram.Views.FeedSubmissionShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['feed/submission_show'],
  className: 'row',

  render: function () {
    var content = this.template({
      submission: this.model
    });
    this.$el.html(content);
    return this;
  }
});
