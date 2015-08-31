angular.module("app", ['ui.router', 'ngAnimate', 'ngResource',  'ngMaterial', 'ngAria', 'my.directives', 'my.services', 'ngTouch'])
    .config(function ($stateProvider, $locationProvider, $httpProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                views: {
                    "": {
                        templateUrl: 'cv/partials/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })
            .state('main', {
                url: '',
                views: {
                    "header@": {
                        templateUrl: 'cv/partials/header.html',
                        controller: 'mainCtrl'
                    },
                    "main@": {
                        templateUrl: 'cv/partials/main.html',
                        controller: 'mainCtrl'
                    },
                    "sidenav@": {
                        templateUrl: 'cv/partials/sidenav.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.skills', {
                url: '',
                views: {
                    "main@": {
                        templateUrl: 'cv/partials/skills.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.experience', {
                url: '',
                views: {
                    "main@": {
                        templateUrl: 'cv/partials/experience.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.about', {
                url: '',
                views: {
                    "main@": {
                        templateUrl: 'cv/partials/about.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.contact', {
                url: '',
                views: {
                    "main@": {
                        templateUrl: 'cv/partials/contact.html',
                        controller: 'mainCtrl'
                    }
                }
            });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })    .factory('authInterceptor', function ($rootScope, $q, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if (window.localStorage.getItem("token")) {
                    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token");
                }
                return config;
            },
            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/');
                    // remove any stale tokens
                    window.localStorage.removeItem("token");
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    });