ImageEditor = function (selector, base64Image) {
  this.base64Image = base64Image;
  this.createCaman(selector);
  this.filter = null;
  this.adjustments = {};
};

ImageEditor.prototype.createCaman = function (selector) {
  /* Possible solution to predicament!!
   *
   * Like previously done, import the image onto the canvas, position it
   * centered vertically or horizontally (depending on width/height) and
   * then set crop variables for the Caman object to work with
   *   
   *   example:  - crop { x, y, width, height }
   *
   * Caman could then call this.crop(x, y, w, h) [..do operations..]
   */
  this.caman = Caman(selector, this.base64Image);
};

/* This function takes an options hash, with valid options being:
 *  - revert: should the image be completely reset before adjusting again
 *  - filter: a filter to apply to the image
 *  - adjustments: a hash with the name of the adjustment and the strength
 */
ImageEditor.prototype.render = function (options) {
  if (options.revert) {
    this.caman.revert(false);
  }

  if (options.filter) {
    this.caman[options.filter]();
  }

  _.each(options.adjustments, function (weight, name) {
    this.caman[name](weight);
  }.bind(this));

  this.caman.render(function () {
    /* TODO: possible callback handler? (free up locked elements, etc)
     * maybe even a callback at the start of the loop so we can lock up
     * elements on a view?
     */
  });
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

ImageEditor.prototype.resetFilter = function () {
  this.filter = null;

  this.render({
    revert: true,
    adjustments: this.adjustments
  });
};

ImageEditor.prototype.resetAdjustments = function () {
  this.adjustments = {};
  this.render({ revert: true });
};

ImageEditor.prototype.toBase64 = function () {
  return this.caman.toBase64();
};
