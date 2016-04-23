angular.module("app")
    .controller('mainCtrl', function ($scope, $mdSidenav, rest, $mdDialog, Auth) {
        $scope.ie=false;
        if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))$scope.ie=true;

        var prom = rest.getjobs();
        prom.then(function(data){
            $scope.jobs =data;
        });
        var prom2 = rest.getInfo();
        prom2.then(function(data){
            $scope.info =data;
        });
        $scope.close = function () {
            $mdSidenav('left').close();
        };
        $scope.toggle = function () {
            $mdSidenav('left').toggle();
        };
        $scope.getcv = function () {
            rest.getcv();
        };
        $scope.showDialog = function (ev) {
            $mdDialog.show({
                controller: 'DialogCtrl',
                templateUrl: 'mean-cv/partials/dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                }, function () {
                });
        };
        $scope.logout = function () {
            Auth.logout();
        };
    });