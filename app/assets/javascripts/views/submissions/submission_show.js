AnyGram.Views.SubmissionShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.favorers(), 'add remove', this.render);
    this.listenTo(this.model.comments(), 'add remove', this.render);
  },

  template: JST['submission/show'],
  id: 'feed',
  className: 'feed-item',
  tagName: 'article',

  events: { 
    'click #set-profile-picture': 'setProfilePicture'
  },

  render: function () {
    var content = this.template({
      submission: this.model,
      submitter: this.model.submitter(),
      favorers: this.model.favorers(),
      comments: this.model.comments()
    });
    
    this.$el.html(content);

    var $favs = this.$el.find('.fav-img, .fav-btn');
    $favs.favoritable(this.model, {
      onEventBegin: this.beginFavoriting.bind(this),
    });

    if (this.model.get('favorited')) {
      $favs.addClass('favorited');
    }

    var $newComment = this.$el.find('.new-comment-form');
    $newComment.commentable(this.model);

    return this;
  },

  beginFavoriting: function (favorited) {
    var $favImg = this.$el.find('.fav-img');

    var heartType = favorited ? 'heart-overlay' : 'heart-break-overlay';
    var $heart = $('<div>').addClass(heartType + ' animated fadeOut');

    $favImg.prepend($heart);

    var $favBtn = this.$el.find('.fav-btn');

    if (favorited) {
      $favBtn.addClass('favorited');
    } else {
      $favBtn.removeClass('favorited');
    }
  },

  setProfilePicture: function (event) {
    event.preventDefault();
    var avatar_url = this.model.get('thumb_url');
    var profile_id = AnyGram.currentUser.profile().id;

    $.ajax({
      url: '/api/profiles/' + profile_id,
      type: 'PATCH',
      dataType: 'json',
      data: { profile: { avatar_url: avatar_url } },
      success: function (model) {
        AnyGram.currentUser.profile().set(model);
      }
    });

  }
});
