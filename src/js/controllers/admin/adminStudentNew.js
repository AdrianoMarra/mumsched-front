//adminStudent.js
angular
.module('app')
.controller('adminStudentNew', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', function($scope, $http, $httpParamSerializer, $state, $location) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.student = {};
  $http.get('http://localhost:8000/api/students',
  // $httpParamSerializer(userInfo),
  {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(function successCallback(response) {

    //Just an example because we dont have the route to get only one student
    var paramValue = $location.search().id;
  	$scope.student = response.data[paramValue];

  }, function errorCallback(response) {
    console.log(response);
  });


}]);
