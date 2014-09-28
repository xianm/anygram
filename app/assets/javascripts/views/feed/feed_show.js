AnyGram.Views.FeedShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSubmission);

    this.model.submissions().each(this.addSubmission.bind(this));
  },

  template: JST['feed/show'],
  tagName: 'section',
  id: 'feed',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addSubmission: function (submission) {
    var view = new AnyGram.Views.SubmissionFeed({
      model: submission
    });
    this.addSubview('#feed-items', view);
  }
});
