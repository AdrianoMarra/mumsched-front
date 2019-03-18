//facultyLogin.js
angular
.module('app')
.controller('faculty', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.facultyName = localStorage.facultyName;
  if($scope.facultyName == undefined){
    $state.go('appSimple.loginFaculty')
  }

}]);