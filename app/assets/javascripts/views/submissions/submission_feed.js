AnyGram.Views.SubmissionFeed = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.favorers(), 'add remove', this.render);
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

    var $favoritable = this.$el.find('.favoritable');

    $favoritable.favoriteToggle({
      favorited: this.model.get('favorited'),
      submissionId: this.model.id,

      onEventEnd: function ($el, favorited) {
        var submission = this.model;
        this.model.set({ favorited: favorited });

        if (favorited) {
          submission.favorers().add(AnyGram.currentUser.profile());
        } else {
          submission.favorers().remove(AnyGram.currentUser.profile());
        }

        $el = this.$el.find('.favoritable');
        $el.addClass('animated');
        $el.addClass(favorited ? 'tada' : 'shake');
      }.bind(this)
    });

    return this;
  }
});
