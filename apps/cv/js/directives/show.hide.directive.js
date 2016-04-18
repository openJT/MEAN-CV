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
            '<img src="/images/icons/ic_keyboard_arrow_down_black_24px.svg" ' +
            'style="height:2em;outline: none" class="caret" ng-click="toggle()" alt=""/>' +
            '</div>' +
            '<div ng-transclude  class="invisibleList"></div>' +
            '</div>',

            link: function (scope, element) {
                function hasClass(element, className) {
                    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
                }

                var child = element[0].children[1];
                var img = element[0].children[0].children[0];

                scope.path = '/images/icons/ic_keyboard_arrow_down_black_24px.svg';
                scope.toggle = function () {
                    if (hasClass(child, 'showList')) {
                        $animate.removeClass(child, 'showList');
                        $animate.removeClass(img, 'rotateCaret');
                    }
                    else {
                        $animate.addClass(child, 'showList');
                        $animate.addClass(img, 'rotateCaret');
                    }

                };

            }
        }

    });