Backbone.Collection.prototype.getOrFetch = function (id) {
  var entity = this.get(id);

  if (entity) {
    entity.fetch();
  } else {
    entity = new this.model({ id: id });
    entity.fetch({
      success: function () {
        this.add(entity);
      }.bind(this)
    });
  }

  return entity;
};

Backbone.Router.prototype.changeView = function (view) {
  if (this.currentView) {
    this.currentView.remove();
  }

  this.$rootEl.html(view.render().$el);
  this.currentView = view;
};
