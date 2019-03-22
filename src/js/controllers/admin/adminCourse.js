//adminCourse.js
angular
.module('app')
.controller('adminCourse', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', function($scope, $http, $httpParamSerializer, $state, $location) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.isUpdate = false;
  $scope.course = {};
  var paramValue = $location.search().id;

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://localhost:8000/api/courses/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.course = response.data;
  		$scope.course.on_campus == 1 ? $scope.course.on_campus = true : $scope.course.on_campus = false;
      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.loadList = function (){
    $http.get('http://localhost:8000/api/courses',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.courses = response.data;
    }, function errorCallback(response) {
    });
  };

  $scope.delete = function(id) {
    $http.delete('http://localhost:8000/api/courses/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/courses" );
  };
  $scope.create = function() {
  	$scope.course.on_campus == true ? $scope.course.on_campus = 1 :$scope.course.on_campus = 0;
    $http.post('http://localhost:8000/api/courses', $scope.course,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/courses" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {
  	$scope.course.on_campus == true ? $scope.course.on_campus = 1 :$scope.course.on_campus = 0;
    $http.put('http://localhost:8000/api/courses/' + paramValue, $scope.course,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/courses" );
    }, function errorCallback(response) {
    });
  };

  }]);