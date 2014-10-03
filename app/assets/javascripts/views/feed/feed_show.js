AnyGram.Views.FeedShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.maxCreatedAt = null;
    this.canFetch = false;
    this.prependSubviews = false;

    this.bindEvents();

    this.fetchSubmissions();
  },

  bindEvents: function () {
    this.listenTo(this.collection, 'add', this.addSubmission);

    $('#home-btn').on('click', this.refreshSubmissions.bind(this));

    var view = this;
    $(window).on('scroll', function () {
      if (view.canFetch) {
        var $window = $(this);
        var $feedItem = $('.feed-item:nth-last-of-type(2)');

        if ($feedItem.length > 0) {
          var offset = $feedItem.offset().top;
          var windowY = window.pageYOffset + $window.height();

          if (windowY > offset) {
            view.canFetch = false;
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

    return this;
  },

  fetchSubmissions: function () {
    var view = this;
    var options = {
      url: '/api/feed',
      dataType: 'json',
      success: function (data) {
        view.prependSubviews = false;

        var submissions = data.submissions;

        if (submissions.length > 0) {
          view.collection.add(submissions, { parse: true });
          view.maxCreatedAt = submissions[submissions.length - 1].created_at;

          if (submissions.length >= 7) {
            view.canFetch = true;
          } else {
            $(window).unbind('scroll');
            $('#explore').show();
          }
        } else { 
          $('#explore').show();
        }
      }
    };

    if (this.maxCreatedAt) {
      options.data = { max_created_at: this.maxCreatedAt };
    }

    $.ajax(options);
  },

  refreshSubmissions: function () {
    if (this.collection.length === 0) {
      return;
    }

    var last_submisison = this.collection.at(0);
    var min_created_at = last_submisison.get('created_at');
    var view = this;
    var options = {
      url: '/api/feed',
      dataType: 'json',
      data: { min_created_at: min_created_at },
      success: function (data) {
        view.prependSubviews = true;

        var submissions = data.submissions.reverse();

        if (submissions.length > 0) {
          view.collection.add(data.submissions, { parse: true });
        }
      }
    };

    $.ajax(options);
  },

  addSubmission: function (submission) {
    var view = new AnyGram.Views.SubmissionFeed({
      model: submission
    });
    this.addSubview('#feed-items', view, this.prependSubviews);
  }
});
