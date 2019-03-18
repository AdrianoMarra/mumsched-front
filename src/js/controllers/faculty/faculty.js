//facultyLogin.js
angular
.module('app')
.controller('faculty', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.facultyData = JSON.parse(localStorage.getItem('facultyData'));
  if($scope.facultyData == undefined){
    $state.go('appSimple.loginFaculty')
  }

}]);