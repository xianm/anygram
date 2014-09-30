AnyGram.Views.SubmissionNew = Backbone.View.extend({
  initialize: function () {
    this.editing = false;
    this.adjustments = {};
  },

  id: 'editor-container',

  template: function () {
    return JST[this.editing ? 'submission/editor' : 'submission/new']();
  },

  events: {
    'click #file-upload': 'onFileUploadClick',
    'change #file-source': 'onFileSourceChange',
    'click #upload': 'onUpload',
    'click #cancel': 'onCancel',
    'change input[type=range]': 'onRangeChange',
    'click #reset': 'onReset'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.editing) {
      this.renderCanvas(this.image);
    }

    return this;
  },

  onFileUploadClick: function (event) {
    var $fileInput = $('#file-source');
    $fileInput.click();
  },

  onFileSourceChange: function (event) {
    var view = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function (e) {
      view.initializeCanvas(this.result);
      view.editing = true;
      view.render();
    };

    reader.readAsDataURL(file);
  },

  initializeCanvas: function (dataUrl) {
    this.caman = Caman('#editor', dataUrl);
  },

  renderCanvas: function () {
    var adjs = this.adjustments;
    this.caman.revert(false);

    for (var prop in this.adjustments) {
      var value = this.adjustments[prop] / 1;
      console.log(prop + ' = ' + value);
      this.caman[prop](value);
    }

    this.caman.render();
  },

  onRangeChange: function (event) {
    if (event.target.value === $(event.target).data('default')) {
      delete this.adjustments[event.target.name];
    } else {
      this.adjustments[event.target.name] = event.target.value;
    }

    this.renderCanvas(this.image);
  },

  onReset: function (event) {
    event.preventDefault();

    $('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });
    this.adjustments = {};
    this.renderCanvas(this.image);
  },

  onUpload: function (event) {
    event.preventDefault();

    var canvas = $('#editor').get(0);
    var data = canvas.toDataURL('image/jpeg');

    var attrs = $('#editor-form').serializeJSON();
    attrs.source = data;

    this.model.save(attrs, {
      success: function (model) {
        Backbone.history.navigate('#/view/' + model.id);
      }
    });
  },

  onCancel: function (event) {
    event.preventDefault();

    this.image = null;
    this.caman = null;
    this.editing = false;
    this.render();
  }
});
