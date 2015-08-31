'use strict';
angular.module('my.directives', ['ngAnimate'])
    .directive('showHide', function ($animate) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {},
            template: '<div>' +
            '<div class="showHideFlex">' +
            ' <img id="showHideSwitch" ng-src="{{path}}" style="height:2em;outline: none" ng-click="toggle()" alt=""/>' +
            '</div>' +
            '<div ng-transclude  class="invisibleList"></div>' +
            '</div>',

            link: function (scope, element) {
                function hasClass(element, className) {
                    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
                }

                var child = element[0].children[1];
                var img = document.getElementById('showHideSwitch');

                scope.path = '/images/icons/ic_keyboard_arrow_down_black_24px.svg';
                scope.toggle = function () {
                    if (hasClass(child, 'showList')) {
                        $animate.removeClass(child, 'showList').then(function () {
                        });

                        scope.path = '/images/icons/ic_keyboard_arrow_down_black_24px.svg';
                    }
                    else {
                        $animate.addClass(child, 'showList').then(function () {

                        });
                        scope.path = '/images/icons/ic_keyboard_arrow_up_black_24px.svg';
                    }

                };

            }
        }

    });