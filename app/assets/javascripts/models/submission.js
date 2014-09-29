AnyGram.Models.Submission = Backbone.Model.extend({
  urlRoot: '/api/submissions',

  favoritesStr: function (preview) {
    if (this.favorers().length === 0) {
      return 'Be the first to like this!';
    }

    var html = preview.map(function (f) {
      return f.linkTo();
    }).join(', ');

    var remainder = Math.max(0, this.favorers().length - preview.length);

    if (remainder) {
      html += ' and ' + remainder + ' other';
      if (remainder !== 1) html += 's';
    }

    html += preview.length === 1 ? ' likes this.' : ' like this.';

    return html;
  },

  submitter: function () {
    this._submitter = this._submitter || 
      new AnyGram.Models.Profile();
    return this._submitter;
  },

  favorers: function () {
    this._favorers = this._favorers ||
      new AnyGram.Collections.Profiles();
    return this._favorers;
  },

  comments: function () {
    this._comments = this._comments ||
      new AnyGram.Collections.Comments();
    return this._comments;
  },

  parse: function (resp, options) {
    if (resp.submitter) {
      this.submitter().set(resp.submitter, { parse: true });
      delete resp.profile;
    }

    if (resp.favorers) {
      this.favorers().set(resp.favorers, { parse: true });
      delete resp.favorers;
    }

    if (resp.comments) {
      this.comments().set(resp.comments, { parse: true });
      delete resp.favorers;
    }

    return resp;
  }
});
