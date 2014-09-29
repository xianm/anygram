AnyGram.Views.SubmissionFeed = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.favorers(), 'add remove', this.render);
    this.listenTo(this.model.comments(), 'add remove', this.render);
  },

  template: JST['submission/feed'],
  className: 'feed-item',
  tagName: 'article',

  render: function () {
    var content = this.template({
      submission: this.model,
      submitter: this.model.submitter(),
      favorers: this.model.favorers(),
      comments: this.model.comments()
    });
    
    this.$el.html(content);

    var $favImg = this.$el.find('.fav-img');
    $favImg.favoritable(this.model, {
      event: 'dblclick',
      onEventBegin: this.beginFavoriting.bind(this),
    });

    var $favBtn = this.$el.find('.fav-btn');
    $favBtn.favoritable(this.model, { 
      onEventBegin: this.beginFavoriting.bind(this),
    });

    if (this.model.get('favorited')) {
      $favBtn.addClass('favorited');
    }

    var $newComment = this.$el.find('.new-comment-form');
    $newComment.commentable(this.model);

    return this;
  },

  beginFavoriting: function (favorited) {
    var heartType = favorited ? 'heart-overlay' : 'heart-break-overlay';
    var $heart = $('<div>').addClass(heartType + ' animated fadeOut');

    var $favImg = this.$el.find('.fav-img');
    $favImg.prepend($heart);

    var $favBtn = this.$el.find('.fav-btn');

    if (favorited) {
      $favBtn.addClass('favorited');
    } else {
      $favBtn.removeClass('favorited');
    }
  }
});
