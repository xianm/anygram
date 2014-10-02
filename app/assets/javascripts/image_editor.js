ImageEditor = function (selector, base64Image) {
  this.adjustments = {};
  this.filter = null;
  this.scale = 1;

  this.initializeKinetic(selector);
  this.initializeCaman(base64Image);
};

ImageEditor.prototype.initializeKinetic = function (selector) {
  this.stage = new Kinetic.Stage({
    container: selector,
    width: 512,
    height: 512
  });

  this.imageLayer = new Kinetic.Layer();

  this.stage.add(this.imageLayer);
};

ImageEditor.prototype.finalizeKinetic = function () {
  this.kineticImage = new Kinetic.Image({
    x: 0,
    y: 0,
    image: this.camanCanvas,
    draggable: true
  });

  this.imageLayer.add(this.kineticImage);
};

ImageEditor.prototype.initializeCaman = function (base64Image) {
  this.camanCanvas = document.createElement('canvas');
  var context = this.camanCanvas.getContext('2d');

  this.image = new Image();
  this.image.onload = function () {
    this.camanCanvas.width = this.image.width;
    this.camanCanvas.height = this.image.height;

    context.drawImage(this.image, 0, 0);

    this.finalizeKinetic();

    this.render({});
  }.bind(this);
  this.image.src = base64Image;
};

/* This function takes an options hash, with valid options being:
 *  - revert: should the image be completely reset before adjusting again
 *  - filter: a filter to apply to the image
 *  - adjustments: a hash with the name of the adjustment and the strength
 */
ImageEditor.prototype.render = function (options) {
  var editor = this;

  Caman(this.camanCanvas, function () {
    if (options.revert) {
      this.revert(false);
    }

    if (options.filter) {
      this[options.filter]();
    }

    _.each(options.adjustments, function (weight, name) {
      this[name](weight);
    }.bind(this));

    this.render(function () {
      editor.imageLayer.scale(editor.getScale());
      editor.imageLayer.draw();
    });
  });
};

ImageEditor.prototype.setScale = function (scale) {
  this.scale = scale;
  this.imageLayer.scale(this.getScale());
  this.imageLayer.draw();
};

ImageEditor.prototype.getScale = function () {
  return { x: this.scale, y: this.scale };
};

ImageEditor.prototype.applyFilter = function (name) {
  this.filter = name;

  this.render({
    revert: true,
    filter: this.filter,
    adjustments: this.adjustments
  });
};

ImageEditor.prototype.applyAdjustment = function (name, weight, defaultWeight) {
  var prevWeight = this.adjustments[name];

  if (weight === defaultWeight) {
    delete this.adjustments[name];
  } else {
    this.adjustments[name] = weight;
  }

  var currWeight = this.adjustments[name];
  var revert = (prevWeight && prevWeight !== currWeight);
  var adjustment = {};
  adjustment[name] = weight;

  this.render({
    revert: revert,
    filter: revert ? this.filter : null,
    adjustments: revert ? this.adjustments : adjustment
  });
};

ImageEditor.prototype.resetAll = function () {
  this.adjustments = {};
  this.scale = 1;

  this.render({ revert: true });
};

ImageEditor.prototype.resetFilter = function () {
  this.filter = null;

  this.render({
    revert: true,
    adjustments: this.adjustments
  });
};

ImageEditor.prototype.saveImage = function (callback) {
  console.log('loading');
  this.stage.toDataURL({
    mimeType: 'image/jpeg',
    quality: 1,
    callback: callback
  });
};
