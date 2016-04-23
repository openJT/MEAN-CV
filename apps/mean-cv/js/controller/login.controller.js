'use strict';
angular.module('app')
    .controller('loginCtrl', function ($scope, Auth, $state) {
        $scope.errors = {};
        $scope.login = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                }).then(function () {
                    $state.go('main.skills');
                }).catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };
    });
