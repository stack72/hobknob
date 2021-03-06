angular.module('featureToggleFrontend').factory('toggleService', ['ENV', '$http', 'CurrentUser', 'auditService', function(ENV, $http, CurrentUser, auditService) {
    'use strict';

    var exports = {};

    exports.getApplications = function (success, error) {
        var path = '/api/applications';
        return $http.get(path)
            .success(function(data){
                success(data);
            })
            .error(function(data){
                error(data);
            });
    };

    exports.addApplication = function (name, success, error) {
        var path = '/api/applications';
        $http.put(path, { name: name })
            .success(function(data, status){
                success(status);
            })
            .error(function(data){
                error(data);
            });
    };

    exports.getToggles = function (applicationName, success, error) {
        var path = '/api/applications/' + applicationName;
        $http.get(path)
            .success(function(data){
                success(data.toggles);
            })
            .error(function(data){
                error(data);
            });
    };

    exports.addToggle = function (applicationName, toggleName, value, success, error) {
        var path = '/api/applications/' + applicationName;
        $http.post(path, { toggleName: toggleName, value: value })
            .success(function(data, status){
                success(status);
            })
            .error(function(data){
                error(data);
            });
    };

    exports.updateToggle = function (applicationName, toggleName, value, success, error) {
        var path = '/api/applications/' + applicationName + '/' + toggleName;
        $http.put(path, { value: value })
            .success(function(data, status){
                success(status);
            })
            .error(function(data){
                error(data);
            });
    };

    exports.deleteToggle = function(applicationName, toggleName, callback){
        var path = '/api/applications/' + applicationName + '/' + toggleName;
        $http.delete(path)
            .success(function(){
                callback();
            })
            .error(function(data){
                callback(new Error(data));
            });
    };

    return exports;

}]);