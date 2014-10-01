Caman.Filter.register("claribel", function () {
  this.sharpen(25);
  this.saturation(-10);

  this.newLayer(function() {
    this.setBlendingMode("multiply");
    this.opacity(70);
    this.copyParent();
    this.filter.sharpen(5);
    this.filter.contrast(30);
    this.filter.exposure(20);
    return this.filter.channels({
      blue: 5
    });
  });

  return this.brightness(5);
});
