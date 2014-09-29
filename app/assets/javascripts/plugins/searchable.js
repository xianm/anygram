$.Searchable = function (el, options) {
  this.$el = $(el);
  this.$searchBar = $(options.searchBar);
  this.$results = $(options.results);

  this.$el.on('submit', this.onSubmit.bind(this));
  this.$searchBar.on('input', this.onInput.bind(this));
  this.$searchBar.on('focusout', this.onFocusOut.bind(this));
  this.$searchBar.on('keyup', this.onKeyUp.bind(this));
};

$.Searchable.prototype.onSubmit = function (event) {
  event.preventDefault();
};

$.Searchable.prototype.onInput = function (event) {
  var q= event.target.value;
  var payload = { query: q};

  if (q.length === 0 || (q.length === 1 && q[0] === '@')) {
    this.$results.empty();
    return;
  }

  $.ajax({
    url: '/api/profiles/search',
    method: 'GET',
    dataType: 'json',
    data: payload,

    success: function (data) {
      this.$results.empty();

      data.results.forEach(function (result) {
        this.$results.append(this.makeResultItem(result));
      }.bind(this));
    }.bind(this),
  });
};

$.Searchable.prototype.onFocusOut = function (event) {
  this.$results.empty();
  this.$searchBar.val('');
};

$.Searchable.prototype.onKeyUp = function (event) {
  if (event.ctrlKey) {
    // TODO: vim-like navigation through search results!
    if (event.keyCode === 78) { // N - down
    } else if (event.keyCode === 79) { // O - click
    } else if (event.keyCode === 80) { // P - up
    }
  }
};

$.Searchable.prototype.makeResultItem = function (result) {
  var link = '#/profiles/' + result.id;

  var $li = $('<li>').one('mousedown', function (event) {
    this.$results.empty();
    this.$searchBar.val('');
    Backbone.history.navigate(link, { trigger: true });
  }.bind(this));

  return $li.text('@' + result.name + " - " + result.display_name);
};

$.fn.searchable = function (options) {
  return this.each(function () {
    new $.Searchable(this, options);
  });
};
