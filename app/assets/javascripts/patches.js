Backbone.Collection.prototype.getOrFetch = function (id, options) {
  var entity = this.get(id);

  if (entity) {
    entity.fetch(options);
  } else {
    entity = new this.model({ id: id });
    entity.fetch({
      success: function () {
        this.add(entity);

        if (options && options.success) options.success(arguments);
      }.bind(this),

      error: function () {
        if (options && options.error) options.error(arguments);
      }
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
