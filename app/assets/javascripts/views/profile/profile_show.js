AnyGram.Views.ProfileShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addThumbnail);

    this.model.submissions().each(this.addThumbnail.bind(this));
  },

  template: JST['profile/show'],
  className: 'container-fluid',

  render: function () {
    var content = this.template({ 
      profile: this.model,
    });

    this.$el.html(content);

    this.attachSubviews();

    var $followBtn = this.$el.find('#follow-btn');
    $followBtn.followToggle({
      following: this.model.get('following'),
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
