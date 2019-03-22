//adminFaculty.js
angular
.module('app')
.controller('adminFaculty', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', function($scope, $http, $httpParamSerializer, $state, $location) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.isUpdate = false;
  $scope.faculty = {};
  var paramValue = $location.search().id;

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://localhost:8000/api/faculty/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.faculty = response.data;
      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.loadList = function (){
    $http.get('http://localhost:8000/api/faculty',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.faculties = response.data;
    }, function errorCallback(response) {
    });
  };

  $scope.delete = function(id) {
    $http.delete('http://localhost:8000/api/faculty/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/faculties" );
  };
  $scope.create = function() {
  	$scope.faculty.password = "12345"; //default
    $http.post('http://localhost:8000/api/faculty', $scope.faculty,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/faculties" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {
    $http.put('http://localhost:8000/api/faculty/' + paramValue, $scope.faculty,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/faculties" );
    }, function errorCallback(response) {
    });
  };

 }]);