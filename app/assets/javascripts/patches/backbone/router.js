Backbone.Router.prototype.changeView = function (view) {
  if (this.currentView) {
    this.currentView.remove();
  }

  this.$rootEl.html(view.render().$el);
  this.currentView = view;
};
