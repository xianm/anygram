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
      this.initializeCanvas(this.image);
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

  initializeCanvas: function (image) {
    this.caman = Caman('#editor', image);
  },

  renderCanvas: function (revert, adjustments) {
    if (revert) this.caman.revert(false);

    for (var prop in adjustments) {
      this.caman[prop](adjustments[prop]);
    }

    this.caman.render();
  },

  onRangeChange: function (event) {
    this.prevAdjustments = _.clone(this.adjustments);

    if (event.target.value === $(event.target).data('default')) {
      delete this.adjustments[event.target.name];
    } else {
      this.adjustments[event.target.name] = event.target.value * 1;
    }

    var revert = false;
    var newAdjustments = {};

    for (var prop in this.adjustments) {
      var prev = this.prevAdjustments[prop];
      var next = this.adjustments[prop];

      if (prev && prev !== next) {
        revert = true;
        break;
      } else if (!prev) {
        newAdjustments[prop] = next;
      }
    }

    this.renderCanvas(revert, revert ? this.adjustments : newAdjustments);
  },

  onReset: function (event) {
    event.preventDefault();

    $('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });

    this.adjustments = {};
    this.renderCanvas(true, {});
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

    this.caman = null;
    this.editing = false;
    this.render();
  }
});
