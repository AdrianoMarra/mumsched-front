//studentLogin.js
angular
.module('app')
.controller('student', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.studentData = JSON.parse(localStorage.getItem('studentData'));
  if($scope.studentData == undefined){
    $state.go('appSimple.loginStudent')
  }

}]);



