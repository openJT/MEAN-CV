'use strict';
angular.module('my.services')
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
