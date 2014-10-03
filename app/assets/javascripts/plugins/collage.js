$.Collage = function (el, sources, options) {
  this.$el = $(el);
  this.sources = sources;

  this.$images = this.$el.find('img');
  this.setInitialImages();

  setInterval(this.updateCollage.bind(this), 2500);
};

$.Collage.prototype.setInitialImages = function () {
  this.sample = _.sample(this.sources, 7);

  this.$images.each(function (i, el) {
    this.setImageSource($(el), this.sample[i]);
  }.bind(this));
};

$.Collage.prototype.updateCollage = function () {
  var $img = $(_.sample(this.$images, 1));
  var possibleSources = $(this.sources).not(this.sample).get();
  var newSource = _.sample(possibleSources, 1)[0];
  var oldSource = $img.attr('src');

  this.sample.push(newSource);

  var index = -1;
  _.each(this.sample, function (el, i) {
    if (el.url === oldSource) {
      index = i;
      return;
    }
  });

  if (index > -1) this.sample.splice(index, 1);

  this.setImageSource($img, newSource);
};

$.Collage.prototype.setImageSource = function ($img, source) {
  var $parent = $($img[0]).parent();
  $parent.attr('href', '#/view/' + source.id);
  $img.attr('src', source.url);
};

$.fn.collage = function (sources, options) {
  return this.each(function () {
    new $.Collage(this, sources, options);
  });
};
