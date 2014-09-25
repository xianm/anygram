AnyGram.Views.SubmissionShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['submission/show'],
  className: 'container-fluid',

  render: function () {
    var content = this.template({ 
      submission: this.model,
      profile: this.model.profile()
    });
    this.$el.html(content);
    return this;
  }
});
