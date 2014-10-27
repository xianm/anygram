$.Alerts = function (el, options) {
  this.$el = $(el);

  this.fetchAlerts();
  setInterval(this.refresh.bind(this), 2500);
};

$.Alerts.prototype.fetchAlerts = function () {
  console.log("Fetching alerts...");

  this.addAlert(false);
};

$.Alerts.prototype.refresh = function () {
  console.log("Refreshing alerts...");
};

$.Alerts.prototype.addAlert = function (isNew) {
  var $alert = this.buildAlert(isNew);
  this.$el.append($alert);
};

$.Alerts.prototype.buildAlert = function (isNew) {
  var $alert = $("<div>").addClass("alert");

  if (isNew) {
    $alert.addClass("new");
  }

  $alert.append(this.buildAvatar("http://placehold.it/50x50", 1));
  $alert.append(this.buildUserLink("username", 1));
  $alert.append(this.buildText(0));
  $alert.append(this.buildSubmission("http://placehold.it/50x50", 1));

  return $alert;
};

$.Alerts.prototype.buildAvatar = function (src, id) {
  return this.buildLinkedImg(src, "#/profiles/" + id).addClass("avatar-sm");
};

$.Alerts.prototype.buildUserLink = function (name, id) {
  return $("<a>").text(name).prop("href", "#/profiles/" + id);
};

$.Alerts.prototype.buildText = function (type) {
  var text = "";

  if (type === 0) { // picture liked
    text = " liked your picture";
  }

  return $("<span>").text(text);
};

$.Alerts.prototype.buildSubmission = function (src, id) {
  return this.buildLinkedImg(src, "#/view/" + id).addClass("submission-sm");
};

$.Alerts.prototype.buildLinkedImg = function (src, url) {
  var $link = $("<a>").prop("href", url);
  var $img = $("<img>").prop("src", src);

  return $link.append($img);
};

$.fn.alerts = function (options) {
  return this.each(function () {
    new $.Alerts(this, options);
  });
};
