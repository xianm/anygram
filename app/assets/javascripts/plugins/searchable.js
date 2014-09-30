$.Searchable = function (el, options) {
  this.$el = $(el);
  this.$searchBar = $(options.searchBar);
  this.$resultsList = $(options.results);
  this.results = [];
  this.selectedIndex = 0;

  this.$el.on('submit', this.onSubmit.bind(this));
  this.$searchBar.on('input', this.onInput.bind(this));
  this.$searchBar.on('focusout', this.onFocusOut.bind(this));
  this.$searchBar.on('keydown', this.onKeyDown.bind(this));
};

$.Searchable.prototype.onSubmit = function (event) {
  event.preventDefault();
};

$.Searchable.prototype.onInput = function (event) {
  var q = event.target.value;
  var payload = { query: q};

  if (q.length === 0 || (q.length === 1 && q[0] === '@')) {
    this.$resultsList.empty();
    this.results = [];
    return;
  }

  $.ajax({
    url: '/api/profiles/search',
    method: 'GET',
    dataType: 'json',
    data: payload,

    success: function (data) {
      this.$resultsList.empty();
      this.results = [];
      this.selectedIndex = 0;

      data.results.forEach(function (result, index) {
        this.results.push(result);
        this.$resultsList.append(this.makeResultItem(result));
      }.bind(this));

      this.selectIndex(this.selectedIndex);
    }.bind(this),
  });
};

$.Searchable.prototype.onFocusOut = function (event) {
  this.clearSearch();
};

$.Searchable.prototype.onKeyDown = function (event) {
  var ctrl = event.ctrlKey;
  var key  = event.keyCode;

  // prevent browser default key handlers
  if (ctrl && key === 79 || key === 13) { // C-O or ENTER
    event.preventDefault();
  } else if (ctrl && key === 78 || key === 40) { // C-N - Down
    event.preventDefault();
  } else if (ctrl && key === 80 || key === 38) { // C-P - Up
    event.preventDefault();
  } else if (ctrl && key === 67) { // C-C
    event.preventDefault();
  }

  var length = this.results.length;

  if (length <= 0) {
    return;
  }

  if (ctrl && key === 79 || key === 13) { // C-O or ENTER
    this.navigateTo(this.results[this.selectedIndex]);
  } else if (ctrl && key === 78 || key === 40) { // C-N - Down
    this.selectIndex(this.selectedIndex + 1);
  } else if (ctrl && key === 80 || key === 38) { // C-P - Up
    this.selectIndex(this.selectedIndex - 1);
  } else if (ctrl && key === 67) { // C-C
    this.clearSearch();
  }
};

$.Searchable.prototype.makeResultItem = function (result) {
  var $li = $('<li>').one('mousedown', function (event) {
    this.navigateTo(result);
  }.bind(this));

  return $li.text('@' + result.name + " - " + result.display_name);
};

$.Searchable.prototype.clearSearch = function () {
  this.results = [];
  this.selectedIndex = 0;
  this.$resultsList.empty();
  this.$searchBar.val('');
};

$.Searchable.prototype.selectIndex = function (index) {
  var $lis = this.$resultsList.children();
  var length = $lis.length

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

$.fn.searchable = function (options) {
  return this.each(function () {
    new $.Searchable(this, options);
  });
};
