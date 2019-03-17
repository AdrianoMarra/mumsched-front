//studentLogin.js
angular
.module('app')
.controller('student', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.userName = localStorage.userName;
  if($scope.userName == undefined){
    $state.go('appSimple.loginStudent')
  }

}]);



