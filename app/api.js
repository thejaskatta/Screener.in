"use strict";
var Rest = require('fetch-on-rest');

function getCookie(sKey) {
  if (!sKey) { return ''; }
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || '';
}


function addOptions(defaults) {
  defaults.credentials = 'same-origin';
  if(defaults.method == 'raw')
    defaults.headers.Accept = 'text/html,*/*';

  if(defaults.method != 'get')
    defaults.headers['X-CSRFToken'] = getCookie('csrftoken');
}

const useTrailingSlashes = true;
var Api = new Rest('/api', addOptions, useTrailingSlashes);

Api.getCsrf = function() {
  return getCookie('csrftoken');
};

Api.me = ['users', 'me'];
Api.search = ['company', 'search'];
Api.ratioSearch = ['ratios', 'search'];

Api.my = function(resource) {
  return ['users', resource];
};

Api.logout = function() {
  var url = '/logout/';
  var options = this._getOptions(undefined, 'post');
  var raw = window.fetch(url, options);
  return raw.then(this.parseJson);
};

Api.company = function(exchange_code, consolidated) {
  var paths = ['company', exchange_code];
  if (consolidated)
    paths.push('consolidated');
  return paths;
};

Api.cid = function(cid, component) {
  return ['company', cid, component];
};

module.exports = Api;
