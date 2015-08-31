angular.module("app")
    .controller('DialogCtrl', function ($scope, $mdDialog, rest) {
        $scope.info =rest.getInfo();
        $scope.ie=false;
        if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))$scope.ie=true;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    });