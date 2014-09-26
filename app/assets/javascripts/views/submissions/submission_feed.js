AnyGram.Views.SubmissionFeed = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['submission/feed'],
  className: 'container-fluid submission',

  render: function () {
    var content = this.template({
      submission: this.model,
      submitter: this.model.submitter(),
      favorers: this.model.favorers()
    });
    
    this.$el.html(content);
    return this;
  }
});
