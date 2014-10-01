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
    'click #upload': 'onSubmitUpload',
    'click #cancel': 'onCancelUpload',
    'click .filter': 'onApplyFilter',
    'change input[type=range]': 'onAdjustmentChange',
    'click #reset': 'onResetAll'
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

  onSubmitUpload: function (event) {
    event.preventDefault();

    var attrs = $('#editor-form').serializeJSON();
    attrs.source = this.editor.toBase64();

    this.model.save(attrs, {
      success: function (model) {
        Backbone.history.navigate('#/view/' + model.id);
      }
    });
  },

  onCancelUpload: function (event) {
    event.preventDefault();

    this.editing = false;
    this.editor = null;
    this.render();
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

 onAdjustmentChange: function (event) {
    var name = event.target.name;
    var weight = event.target.value * 1;
    var defaultWeight = $(event.target).data('default') * 1;
    this.editor.applyAdjustment(name, weight, defaultWeight);
  },

  onResetAll: function (event) {
    event.preventDefault();

    $('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });

    this.editor.resetAdjustments();
  }
});
