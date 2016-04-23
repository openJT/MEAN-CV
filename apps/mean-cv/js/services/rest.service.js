'use strict';
angular.module('my.services')
    .factory('rest', function ($timeout, $rootScope, $state, $http, $q) {
        var jobs = [];
        var info = [];
        var deferredJobs = $q.defer();
        var deferredInfo = $q.defer();
        $http({url: '/mean-cv/jobs', method: 'GET'})
            .success(function (data) {
                deferredJobs.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferredJobs.reject();
            });
        $http({url: '/mean-cv/info', method: 'GET'})
            .success(function (data) {
                deferredInfo.resolve(data[0]);
            })
            .error(function (data, status, headers, config) {
                deferredInfo.reject();
            });
        return {
            getcv: function () {
                $http({url: '/mean-cv/download', method: 'GET', responseType: "blob"})
                    .success(function (data) {
                        saveAs(data, "JD.pdf");
                    })
                    .error(function (data, status, headers, config) {

                    });
            },
            getjobs: function () {
                return deferredJobs.promise;
            },
            getInfo: function () {
                return deferredInfo.promise;
            }

        }
    });
