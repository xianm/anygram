AnyGram.Views.SubmissionThumbnail = Backbone.View.extend({
  initialize: function () {

  },

  template: JST['submission/thumbnail'],
  className: 'col-xs-3',

  render: function () {
    var content = this.template({
      submission: this.model
    });
    this.$el.html(content);
    return this;
  }
});
