AnyGram.Views.ProfileOverview = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'add', this.render);
  },

  template: JST['profile/overview'],

  render: function () {
    var content = this.template({ profile: this.model });
    this.$el.html(content);

    var $counter = this.$el.find('#followers-count');
    var $followBtn = this.$el.find('#follow-btn');
    $followBtn.followToggle({
      following: this.model.get('following'),
      id: this.model.id,
      callback: function (following) {
        var delta = following ? 1 : -1;
        $counter.text((parseInt($counter.text()) + delta));
      }
    }); 

    return this;
  }
});
