AnyGram.Views.ProfileShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addThumbnail);

    this.model.submissions().each(this.addThumbnail.bind(this));
  },

  template: JST['profile/show'],

  render: function () {
    var content = this.template({ 
      profile: this.model,
    });

    this.$el.html(content);

    this.attachSubviews();

    var sources = this.collection.map(function (s) {
      return { id: s.id, url: s.get('full_url') };
    });

    if (sources.length > 0) {
      var $collage = this.$el.find('#profile-header-collage');
      $collage.collage(sources);
    }

    var $followBtn = this.$el.find('#follow-btn');
    $followBtn.followToggle({
      following: this.model.get('following'),
      $counter: this.$el.find('#followers-count'),
      id: this.model.id
    }); 

    return this;
  },

  addThumbnail: function (submission) {
    var view = new AnyGram.Views.SubmissionThumbnail({
      model: submission
    });
    this.addSubview('#thumbnails', view);
  }
});
