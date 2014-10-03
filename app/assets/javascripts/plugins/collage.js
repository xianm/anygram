$.Collage = function (el, sources, options) {
  this.$el = $(el);
  this.sources = sources;

  this.$images = this.$el.find('img');

  if (this.sources.length >= this.$images.length) {
    this.setInitialImages();

    if (this.sources.length > this.$images.length) {
      setInterval(this.updateCollage.bind(this), 3500);
    }
  } else {
    // WARNING UGLY HACK
    this.$el.empty();
    $('#profile-header-collage').addClass('shrink');
    $('#profile-content').addClass('shrink');
  }
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

  if (possibleSources.length <= 0) {
    return; 
  }

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

  this.setImageSource($img, newSource, true);
};

$.Collage.prototype.setImageSource = function ($img, source, transition) {
  var $parent = $($img[0]).parent();
  $parent.attr('href', '#/view/' + source.id);

  if (transition) {
    $img.fadeOut(250, function () {
      $img.attr('src', source.url);
      $img.fadeIn(250);
    });
  } else {
    $img.attr('src', source.url);
  }
};

$.fn.collage = function (sources, options) {
  return this.each(function () {
    new $.Collage(this, sources, options);
  });
};
