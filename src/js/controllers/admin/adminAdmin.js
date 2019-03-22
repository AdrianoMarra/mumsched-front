//adminAdmin.js
angular
.module('app')
.controller('adminAdmin', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', function($scope, $http, $httpParamSerializer, $state, $location) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.isUpdate = false;
  $scope.admin = {};
  var paramValue = $location.search().id;

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://localhost:8000/api/admins/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.admin = response.data;
      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.loadList = function (){
    $http.get('http://localhost:8000/api/admins',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.admins = response.data;
    }, function errorCallback(response) {
    });
  };

  $scope.delete = function(id) {
    $http.delete('http://localhost:8000/api/admins/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/admins" );
  };
  $scope.create = function() {
  	$scope.admin.password = "12345"; //default
    $http.post('http://localhost:8000/api/admins', $scope.admin,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/admins" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {
    $http.put('http://localhost:8000/api/admins/' + paramValue, $scope.admin,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/admins" );
    }, function errorCallback(response) {
    });
  };

 }]);