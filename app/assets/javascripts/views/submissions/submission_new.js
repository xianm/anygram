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
    'click .filter': 'onApplyFilter',
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
    var view = this;

    Caman('#editor', image, function () {
      var size = {
        width: this.width > this.height ? 512 : null,
        height: this.height > this.width ? 512 : null
      };

      this.resize(size).render(function () {
        view.caman = this;

        $('#editor').width(this.width).height(this.height);
      });
    });
  },

  renderCanvas: function (options) {
    if (options.revert) {
      this.caman.revert(false);
    }

    if (options.filter) {
      this.caman[options.filter]();
    }

    if (options.adjustments) {
      var adjustments = options.adjustments;
      for (var prop in adjustments) {
        this.caman[prop](adjustments[prop]);
      }
    }

    this.caman.render(function () {
      // TODO: handle callback when rendering is finishing..
    });
  },

  onRangeChange: function (event) {
    this.prevAdjustments = _.clone(this.adjustments);

    if (event.target.value === $(event.target).data('default')) {
      delete this.adjustments[event.target.name];
    } else {
      this.adjustments[event.target.name] = event.target.value * 1;
    }

    /* Smarter rendering: search through the current list of adjustments to be
     * applied to the image, and ONLY revert the canvas back to the original
     * state if a value had been previously set and has changed, otherwise just
     * store the list of new changes to be made and apply only those
     */
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

    this.renderCanvas({
      revert: revert, 
      filter: revert ? this.filter : null,
      adjustments: revert ? this.adjustments : newAdjustments
    });
  },

  onApplyFilter: function (event) {
    event.preventDefault();

    this.filter = $(event.target).data('name');

    if (this.filter === 'none') {
      this.filter = null;
    }

    this.renderCanvas({
      revert: true,
      filter: this.filter,
      adjustments: this.adjustments
    });
  },

  onReset: function (event) {
    event.preventDefault();

    $('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });

    this.adjustments = {};
    this.renderCanvas({ revert: true });
  },

  onUpload: function (event) {
    event.preventDefault();

    var attrs = $('#editor-form').serializeJSON();
    attrs.source = this.caman.toBase64();

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
