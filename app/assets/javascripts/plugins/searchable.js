$.Searchable = function (el, options) {
  this.$el = $(el);
  this.$results = $(options.results);

  this.clearResults();
  this.bindEvents();
};

$.Searchable.prototype.bindEvents = function () {
  this.$el.on('submit',   this.onSubmit.bind(this));
  this.$el.on('input',    this.onInput.bind(this));
  this.$el.on('focusout', this.onFocusOut.bind(this));
  this.$el.on('keydown',  this.onKeyDown.bind(this));
};

$.Searchable.prototype.onSubmit = function (event) {
  event.preventDefault();
};

$.Searchable.prototype.onInput = function (event) {
  var q = event.target.value;

  if (q.length === 0 || (q.length === 1 && q[0] === '@')) {
    this.clearResults();
    return;
  }

  $.ajax({
    url: '/api/profiles/search',
    method: 'GET',
    dataType: 'json',
    data: { query: q },
    success: this.handleResponse.bind(this)
  });
};

$.Searchable.prototype.handleResponse = function (data) {
  this.clearResults();

  data.results.forEach(function (result, index) {
    this.results.push(result);
    this.$results.append(this.liFromResult(result));
  }.bind(this));

  this.selectIndex(this.selectedIndex);
};

$.Searchable.prototype.liFromResult = function (result) {
  var $li = $('<li>').one('mousedown', function (event) {
    this.navigateTo(result);
  }.bind(this));

  return $li.text('@' + result.name + " - " + result.display_name);
};

$.Searchable.prototype.onFocusOut = function (event) {
  this.clearSearch();
};

$.Searchable.prototype.onKeyDown = function (event) {
  this.preventDefaults(event);

  if (this.results.length <= 0) {
    return;
  }

  var ctrl = event.ctrlKey;
  var key  = event.keyCode;

  if (ctrl && key === 79 || key === 13) {       // C-O or ENTER
    this.navigateTo(this.results[this.selectedIndex]);
  } else if (ctrl && key === 78 || key === 40) { // C-N - Down
    this.selectIndex(this.selectedIndex + 1);
  } else if (ctrl && key === 80 || key === 38) { // C-P - Up
    this.selectIndex(this.selectedIndex - 1);
  } else if (ctrl && key === 67 || key === 27) { // C-C - Esc
    this.clearSearch();
  }
};

$.Searchable.prototype.preventDefaults = function (event) {
  var ctrlKeys = [79, 78, 80, 67];
  var normKeys = [13, 40, 38, 27];
  var ctrl = event.ctrlKey;
  var key  = event.keyCode;

  if (ctrl && ($.inArray(key, ctrlKeys) !== -1) || 
     !ctrl && ($.inArray(key, normKeys) !== -1)) {
    event.preventDefault();
  }
};

$.Searchable.prototype.selectIndex = function (index) {
  var $lis = this.$results.children();
  var length = $lis.length;

  if (length > this.selectedIndex) {
    $($lis[this.selectedIndex]).removeClass('search-results-selected');
  }

  this.selectedIndex = (index + length) % length;
  $($lis[this.selectedIndex]).addClass('search-results-selected');
};

$.Searchable.prototype.navigateTo = function (result) {
  this.clearSearch();

  var link = '#/profiles/' + result.id;
  Backbone.history.navigate(link, { trigger: true });
};

$.Searchable.prototype.clearSearch = function () {
  this.clearResults();
  this.$el.val('');
};

$.Searchable.prototype.clearResults = function () {
  this.results = [];
  this.selectedIndex = 0;
  this.$results.empty();
};

$.fn.searchable = function (options) {
  return this.each(function () {
    new $.Searchable(this, options);
  });
};
