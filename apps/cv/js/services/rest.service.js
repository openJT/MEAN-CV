'use strict';
angular.module('my.services')
    .factory('rest', function ($timeout, $rootScope, $state, $http) {
        var cnt = 0;
        var prom = $timeout(function () {
            ++cnt;
            $state.go('main.skills')
        }, 2000);
        $rootScope.$on('$stateChangeStart', function () {
            if (cnt === 0)$timeout.cancel(prom);
            ++cnt;
        });
        var jobs = [];
        var info = [];
        $http({url: '/jobs', method: 'GET'})
            .success(function (data) {
                jobs = data;
            })
            .error(function (data, status, headers, config) {

            });
        $http({url: '/info', method: 'GET'})
            .success(function (data) {
                info = data[0];
            })
            .error(function (data, status, headers, config) {

            });
        return {
            getcv: function () {
                $http({url: '/download', method: 'GET', responseType: "blob"})
                    .success(function (data) {
                        saveAs(data, "JD.pdf");
                    })
                    .error(function (data, status, headers, config) {

                    });
            },
            getjobs: function () {
                return jobs;
            },
            getInfo: function () {
                return info;
            }

        }
    });
