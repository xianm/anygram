AnyGram.Views.FeedShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSubmission);

    this.model.submissions().each(this.addSubmission.bind(this));
  },

  template: JST['feed/show'],
  className: 'container-fluid',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    var $favoritable = this.$el.find('.favoritable');

    $favoritable.favoriteToggle({
      onEventBegin: function ($el, favorited) {
        $el.removeClass('animated tada shake');
      },

      onEventEnd: function ($el, favorited) {
        $el.addClass('animated');
        $el.addClass(favorited ? 'tada' : 'shake');
      }
    });

    return this;
  },

  addSubmission: function (submission) {
    var view = new AnyGram.Views.SubmissionFeed({
      model: submission
    });
    this.addSubview('#submissions', view);
  }
});
