//adminLogin.js
angular
.module('app')
.controller('admin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.adminData = JSON.parse(localStorage.getItem('adminData'));
  if($scope.adminData == undefined){
    $state.go('appSimple.loginAdmin')
  }


  $scope.logout = function() {
    localStorage.removeItem("adminData");
    $state.go('appSimple.home')
  }

}]);