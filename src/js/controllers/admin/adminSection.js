//adminSection.js
angular
.module('app')
.controller('adminSection', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', '$filter', function($scope, $http, $httpParamSerializer, $state, $location, $filter) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.isUpdate = false;
  $scope.section = {};
  var paramValue = $location.search().id;

  $scope.block = {};
  $scope.blocks = {};
  $http.get('http://172.19.143.87:8000/api/blocks',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.blocks = response.data;
    }, function errorCallback(response) {
  });

  $scope.course = {};
  $scope.courses = {};
  $http.get('http://172.19.143.87:8000/api/courses',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.courses = response.data;
    }, function errorCallback(response) {
  });

  $scope.faculty = {};
  $scope.faculties = {};
  $http.get('http://172.19.143.87:8000/api/faculty',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.faculties = response.data;
    }, function errorCallback(response) {
  });

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://172.19.143.87:8000/api/sections/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.section = response.data;
        $scope.block = $scope.blocks.find(o => o.id == $scope.section.id_block);
        $scope.course = $scope.courses.find(o => o.id == $scope.section.id_course);
        $scope.faculty = $scope.faculties.find(o => o.id == $scope.section.id_faculty);
      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.create = function() {
    $scope.section.id_block = $scope.block.id;
    $scope.section.id_course = $scope.course.id;
    $scope.section.id_faculty = $scope.faculty.id;

    $http.post('http://172.19.143.87:8000/api/sections', $scope.section,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/sections" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {
    $scope.section.id_block = $scope.block.id;
    $scope.section.id_course = $scope.course.id;
    $scope.section.id_faculty = $scope.faculty.id;

    $http.put('http://172.19.143.87:8000/api/sections/' + paramValue, $scope.section,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/sections" );
    }, function errorCallback(response) {
    });
  };

  $scope.loadList = function (){
    $http.get('http://172.19.143.87:8000/api/sections',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.sections = response.data;
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/sections" );
  };

  $scope.delete = function(id) {
    $http.delete('http://172.19.143.87:8000/api/sections/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

}]);