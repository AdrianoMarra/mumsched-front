//studentLogin.js
angular
.module('app')
.controller('admin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

}]);



