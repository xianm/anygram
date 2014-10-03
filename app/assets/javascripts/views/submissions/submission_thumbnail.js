AnyGram.Views.SubmissionThumbnail = Backbone.View.extend({
  template: JST['submission/thumbnail'],
  className: 'submission-thumbnail',

  render: function () {
    var content = this.template({
      submission: this.model
    });
    this.$el.html(content);
    return this;
  }
});
