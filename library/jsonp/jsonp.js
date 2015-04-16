/*
* Lightweight JSONP fetcher
* Copyright 2010-2012 Erik Karlsson. All rights reserved.
* Copyright 2014 Eugene Mirotin — code refactoring, UMD, Bower support.
* BSD licensed
*/


/*
* Usage:
*
* JSONP.get('someUrl.php', {param1:'123', param2:'456'}, function (data) {
*   //do something with data, which is the JSON object you should retrieve from someUrl.php
* });
*/

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && define.amd) define(definition);
  else {
    var prev = context[name],
      self = definition();
    self.noConflict = function () {
      context[name] = prev;
      return self;
    };
    context[name] = self;
  }
}('JSONP', this, function () {
  if (typeof window === 'undefined') {
    throw new Error("This script is only for use in browser environment");
  }
  var win =  window,
    doc = win.document,
    counter = 0,
    head,
    config = {};

  function load(url, pfnError) {
    var script = doc.createElement('script'),
      done = false;
    script.src = url;
    script.async = true;

    var errorHandler = pfnError || config.error;
    if (typeof errorHandler === 'function') {
      script.onerror = function (ex) {
        errorHandler({url: url, event: ex});
      };
    }

    script.onload = script.onreadystatechange = function () {
      if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
        done = true;
        script.onload = script.onreadystatechange = null;
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      }
    };

    if (!head) {
      head = doc.getElementsByTagName('head')[0];
    }
    head.appendChild(script);
  }

  function encode(str) {
    return encodeURIComponent(str);
  }

  function jsonp(url, params, callback, callbackName) {
    var query = (url || '').indexOf('?') === -1 ? '?' : '&',
      key;

    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    callbackName = callbackName || config.callbackName ||'callback';
    var uniqueName = callbackName + "_json" + (++counter);

    params = params || {};
    for (key in params) {
      if (params.hasOwnProperty(key)) {
        query += encode(key) + "=" + encode(params[key]) + "&";
      }
    }

    win[uniqueName] = function(data) {
      callback(data);
      try {
        win[uniqueName] = null;
        delete win[uniqueName];
      } catch (e) {}
    };

    load(url + query + callbackName + '=' + uniqueName);
    return uniqueName;
  }

  function setDefaults(obj) {
    config = obj;
  }

  return {
    get: jsonp,
    init: setDefaults
  };
});
