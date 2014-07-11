'use strict';

angular.module('featureToggleFrontend')
.factory('etcdPathService', function(ENV) {

  var keyPrefix = ENV.etcdUri + '/v2/keys/',
      statsPrefix = ENV.etcdUri + '/v2/stats/';

  return {

    clean: function(path) {
      var parts = this.explode(path);
      if (parts.length === 0) {
        return '';
      }
      return parts.join('/');
    },

    make: function(arr) {
      return '/' + arr.join('/');
    },

    explode: function(str) {
      var parts = str.split('/');
      parts = parts.filter(function(v) {
        return v !== '';
      });
      return parts;
    },

    /**
     * Get the last segment of a path.
     */
    tail: function(path) {
      var parts = this.explode(path);
      if (parts.length) {
        return parts[parts.length-1];
      }
      return '/';
    },

    truncate: function(path, maxlen) {
      var prefix = '/..';
      maxlen = maxlen || 10;
      if (!path || !path.length) {
        return '';
      }
      if (path.length <= maxlen) {
        return path;
      }
      return prefix +
        path.substring(path.length - maxlen + prefix.length, path.length);
    },

    getFullKeyPath: function(key) {
      var path = keyPrefix + key;
      
      if (path === keyPrefix.substring(0, keyPrefix.length - 1)) {
        return keyPrefix;
      }
      return path;
    },

    getFeatureTogglePath: function(applicationName, toggleName) {
      return this.getFullKeyPath('v1/toggles') + '/' + applicationName + '/' + toggleName;
    },

    getStatFullKeyPath: function(name) {
      return '/' + this.clean(statsPrefix + name);
    },

    getParent: function(path) {
      var parts = path.split('/');
      if (parts.length === 0) {
        return '/';
      }
      parts.pop();
      return '/' + parts.join('/');
    }

  };

}); 