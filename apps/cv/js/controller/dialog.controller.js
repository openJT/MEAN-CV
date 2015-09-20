angular.module("app")
    .controller('DialogCtrl', function ($scope, $mdDialog, rest) {
        $scope.ie=false;
        if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))$scope.ie=true;
        var prom = rest.getInfo();
        prom.then(function(data){
            $scope.info =data;
        });

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    });