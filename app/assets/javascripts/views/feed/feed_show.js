AnyGram.Views.FeedShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.max_created_at = null;
    this.can_fetch = true;

    this.bindEvents();
  },

  bindEvents: function () {
    this.listenTo(this.collection, 'add', this.addSubmission);

    var view = this;
    $(window).on('scroll', function () {
      if (view.can_fetch) {
        var $window = $(this);
        var $feedItem = $('.feed-item:nth-last-of-type(2)');

        if ($feedItem.length > 0) {
          var offset = $feedItem.offset().top;
          var windowY = window.pageYOffset + $window.height();

          if (windowY > offset) {
            view.can_fetch = false;
            view.fetchSubmissions();
          }
        }
      }
    });
  },

  template: JST['feed/show'],
  tagName: 'section',
  id: 'feed',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.fetchSubmissions();

    return this;
  },

  fetchSubmissions: function () {
    var view = this;

    var options = {
      url: '/api/feed',
      dataType: 'json',
      success: function (data) {
        var submissions = data.submissions;

        if (submissions.length > 0) {
          view.collection.add(data.submissions, { parse: true });
          view.max_created_at = submissions[submissions.length - 1].created_at;

          if (submissions.length >= 7) {
            view.can_fetch = true;
          }
        }
      }
    };

    if (this.max_created_at) {
      options.data = { max_created_at: this.max_created_at };
    }

    $.ajax(options);
  },

  addSubmission: function (submission) {
    var view = new AnyGram.Views.SubmissionFeed({
      model: submission
    });
    this.addSubview('#feed-items', view);
  }
});
