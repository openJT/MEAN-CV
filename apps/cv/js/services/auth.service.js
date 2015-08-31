'use strict';
angular.module('my.services', [])
    .factory('Auth', function Auth($location, $rootScope, $http, User, $q) {
        var currentUser = {};
        return {
            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/auth/local', {
                    email: user.email,
                    password: user.password
                })
                    .success(function (data) {
                        window.localStorage.setItem('token', data.token);
                        currentUser = User.get();
                        deferred.resolve(data);
                        return cb();
                    }).
                    error(function (err) {
                        this.logout();
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                window.localStorage.removeItem("token");
                currentUser = {};
            }
        };
    });
