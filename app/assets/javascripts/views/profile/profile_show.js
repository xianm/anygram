AnyGram.Views.ProfileShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['profile/show'],
  className: 'container-fluid',

  render: function () {
    var content = this.template({ 
      profile: this.model,
      submissions: this.model.submissions()
    });

    this.$el.html(content);

    var $followBtn = this.$el.find('#follow-btn');
    $followBtn.followToggle( {
      following: this.model.get('following'),
      userId: this.model.get('user_id')
    }); 

    return this;
  }
});
