angular.module("app", ['ui.router', 'ngAnimate', 'ngResource', 'ngMaterial', 'ngAria', 'my.directives', 'my.services', 'ngTouch'])
    .config(function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/mean-cv/',
                authenticate: false,
                views: {
                    "": {
                        templateUrl: 'mean-cv/partials/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })
            .state('main', {
                url: '/mean-cv/',
                authenticate: true,
                views: {
                    "header@": {
                        templateUrl: 'mean-cv/partials/header.html',
                        controller: 'mainCtrl'
                    },
                    "main@": {
                        templateUrl: 'mean-cv/partials/main.html',
                        controller: 'mainCtrl'
                    },
                    "sidenav@": {
                        templateUrl: 'mean-cv/partials/sidenav.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.skills', {
                url: 'skills',
                authenticate: true,
                views: {
                    "main@": {
                        templateUrl: 'mean-cv/partials/skills.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.experience', {
                url: 'experience',
                authenticate: true,
                views: {
                    "main@": {
                        templateUrl: 'mean-cv/partials/experience.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.about', {
                url: 'about',
                authenticate: true,
                views: {
                    "main@": {
                        templateUrl: 'mean-cv/partials/about.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('main.contact', {
                url: 'contact',
                authenticate: true,
                views: {
                    "main@": {
                        templateUrl: 'mean-cv/partials/contact.html',
                        controller: 'mainCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/mean-cv/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    }).factory('authInterceptor', function ($rootScope, $q, $location) {
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
                    // remove any stale tokens
                    window.localStorage.removeItem("token");
                    $location.path('/mean-cv/');


                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })
    .run(function ($rootScope, Auth, $timeout, $state) {
        var prom;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate) {
                if (!Auth.isLoggedIn()) {
                    // If token invalid or undefined, server redirects to login.
                    $timeout.cancel(prom);
                    Auth.getUserInfo();
                }
            }
        });
    });