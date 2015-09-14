angular.module("app")
    .controller('mainCtrl', function ($scope, $mdSidenav, rest, $mdDialog, Auth) {
        $scope.jobs = rest.getjobs();
        $scope.info = rest.getInfo();
        $scope.ie=false;
        $scope.full = false;
         if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))$scope.ie=true;

        $scope.toggleFullScreen = function(){
            $scope.full = !$scope.full;
        };

        $scope.close = function () {
            $mdSidenav('left').close();
        };
        $scope.toggle = function () {
            $mdSidenav('left').toggle();
        };
        $scope.getcv = function () {
            rest.getcv();
        };
        $scope.showDialog = function(ev) {
            $mdDialog.show({
                controller: 'DialogCtrl',
                templateUrl: 'cv/partials/dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                }, function() {
                });
        };
        $scope.logout = function(){
            Auth.logout();
        };

    });