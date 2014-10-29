$.Alerts = function (el, options) {
  this.$el = $(el);

  this.fetchAlerts();
};

$.Alerts.prototype.fetchAlerts = function () {
  var self = this;

  $.ajax({
    url: '/api/alerts',
    dataType: 'json',
    success: function (data) {
      data.forEach(function (alert) {
        self.addAlert(alert);
      });
    }
  });
};

$.Alerts.prototype.addAlert = function (alert) {
  var $alert = this.buildAlert(alert);
  this.$el.append($alert);
};

$.Alerts.prototype.buildAlert = function (alert) {
  var $alert = $("<div>").addClass("alert");

  if (!alert.read) {
    $alert.addClass("new");
  }

  $alert.append(this.buildAvatar(alert.from.avatar, alert.from.id));
  $alert.append(this.buildContent(alert.from, alert.text));
  $alert.append(this.buildSubmission(alert.submission.url, alert.submission.id));

  return $alert;
};

$.Alerts.prototype.buildAvatar = function (src, id) {
  var $div = $("<div>").addClass("avatar");
  $div.append(this.buildLinkedImg(src, "#/profiles/" + id));
  return $div;
};

$.Alerts.prototype.buildContent = function (from, text) {
  var $div = $("<div>").addClass("content");
  $div.append(this.buildUserLink(from.name, from.id));
  $div.append(this.buildText(text));
  return $div;
};

$.Alerts.prototype.buildUserLink = function (name, id) {
  return $("<a>").text(name).prop("href", "#/profiles/" + id);
};

$.Alerts.prototype.buildText = function (text) {
  return $("<span>").text(" " + text);
};

$.Alerts.prototype.buildSubmission = function (src, id) {
  var $div = $("<div>").addClass("submission");
  $div.append(this.buildLinkedImg(src, "#/view/" + id));
  return $div;
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
