AnyGram.Views.SubmissionShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.favorers(), 'add remove', this.render);
  },

  template: JST['submission/show'],
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
      submissionId: this.model.id,
      favorited: this.model.get('favorited'),

      onEventEnd: function ($el, favorited) {
        var submission = this.model;
        this.model.set({ favorited: favorited });

        if (favorited) {
          submission.favorers().add(AnyGram.currentUser.profile());
        } else {
          submission.favorers().remove(AnyGram.currentUser.profile());
        }

        $el = this.$el.find('.favoritable');
        var heartSel = favorited ? '.heart-overlay' : '.heart-break-overlay';
        $heart = this.$el.find(heartSel);
        $heart.show().addClass('animated fadeOut');
      }.bind(this)
    });

    return this;
  }
});
