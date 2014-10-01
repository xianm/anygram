AnyGram.Views.SubmissionNew = Backbone.View.extend({
  initialize: function () {
    this.editing = false;
    this.editor = null;
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
    'click .filter': 'onApplyFilter',
    'click #reset': 'onReset'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.editing) {
      this.editor = new ImageEditor('#editor', this.image);
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
      view.image = this.result;
      view.editing = true;
      view.render();
    };

    reader.readAsDataURL(file);
  },

  onRangeChange: function (event) {
    var name = event.target.name;
    var weight = event.target.value;
    var defaultWeight = $(event.target).data('default');
    this.editor.applyAdjustment(name, weight, defaultWeight);
  },

  onApplyFilter: function (event) {
    event.preventDefault();

    var name = $(event.target).data('name');

    if (name === 'none') {
      this.editor.resetFilter();
    } else {
      this.editor.applyFilter(name);
    }
  },

  onReset: function (event) {
    event.preventDefault();

    $('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });

    this.editor.resetAdjustments();
  },

  onUpload: function (event) {
    event.preventDefault();

    var attrs = $('#editor-form').serializeJSON();
    attrs.source = this.editor.toBase64();

    this.model.save(attrs, {
      success: function (model) {
        Backbone.history.navigate('#/view/' + model.id);
      }
    });
  },

  onCancel: function (event) {
    event.preventDefault();

    this.editing = false;
    this.editor = null;
    this.render();
  }
});
