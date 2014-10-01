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
  var self = this;

  Caman(selector, this.base64Image, function () {
    var size = {
      width: this.width > this.height ? 512 : null,
      height: this.height > this.width ? 512 : null
    };

    this.resize(size).render(function () {
      self.caman = this;

      $(selector).width(this.width).height(this.height);
    });
  });
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
  this.prevAdjustments = _.clone(this.adjustments);

  if (weight === defaultWeight) {
    delete this.adjustments[name];
  } else {
    this.adjustments[name] = weight;
  }

  /* Smarter rendering: search through the current list of adjustments to be
   * applied to the image, and ONLY revert the canvas back to the original
   * state if a value had been previously set and has changed, otherwise just
   * store the list of new changes to be made and apply only those
   */
  var revert = false;
  var newAdjustments = {};

  _.each(this.adjustments, function (weight, name) {
    var prevWeight = this.prevAdjustments[name];

    if (prevWeight && prevWeight !== weight) {
      revert = true;
      return;
    } else if (!prevWeight) {
      newAdjustments[name] = weight;
    }
  }.bind(this));

  this.render({
    revert: revert,
    filter: revert ? this.filter : null,
    adjustments: revert ? this.adjustments : newAdjustments
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
