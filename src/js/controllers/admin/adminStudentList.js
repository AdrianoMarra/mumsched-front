//adminStudent.js
angular
.module('app')
.controller('adminStudentList', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined) {
    $state.go('appSimple.loginAdmin')
  }

  $scope.students = [];

  $http.get('http://172.19.143.87:8000/api/students',
  // $httpParamSerializer(userInfo),
  {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(function successCallback(response) {

  	$scope.students = response.data;

  }, function errorCallback(response) {
    console.log(response);
  });

}]);



