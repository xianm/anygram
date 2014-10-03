AnyGram.Views.ProfileEdit = Backbone.View.extend({
  initialize: function () {
    this.model.fetch({ success: this.render.bind(this) });
  },

  template: JST['profile/edit'],
  className: 'container-fluid',

  events: {
    'submit form': 'onSubmit'
  },

  render: function () {
    var content = this.template({ profile: this.model });
    this.$el.html(content);
    return this;
  },

  onSubmit: function (event) {
    event.preventDefault();

    var $form = $(event.target);
    var data = $form.serializeJSON().profile;

    this.model.save(data, {
      success: function (model, resp, options) {
        $('#nav-username').text(model.escape('name'));
        Backbone.history.navigate('#', { trigger: true });
      }.bind(this),

      error: function (model, resp, options) {
        AnyGram.alert(resp.responseJSON, { selector: '#inline-alerts' });
      }
    });
  },
});
