//adminStudent.js
angular
.module('app')
.controller('adminStudent', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', function($scope, $http, $httpParamSerializer, $state, $location) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }
  $scope.isUpdate = false;
  $scope.student = {};
  $scope.entry = {};
  $scope.entries = {};
  var paramValue = $location.search().id;

  $http.get('http://172.19.143.87:8000/api/entries',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.entries = response.data;
    }, function errorCallback(response) {
  });

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://172.19.143.87:8000/api/students/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.student = response.data;
        $scope.entry = $scope.entries.find(o => o.id == $scope.student.id_entry);
      }, function errorCallback(response) {
    });

    $http.get('http://172.19.143.87:8000/api/students/' + paramValue + '/all_blocks',
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.blocks = response.data;
      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.create = function() {
    //default
    $scope.student.password = "12345";

    $scope.student.id_entry = $scope.entry.id;
    $http.post('http://172.19.143.87:8000/api/students', $scope.student,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/students" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {

    var blocksAssigned = [];

    //assign blocks
    angular.forEach($scope.blocks, function(block, key) {
      if (block.isAssigned)
          blocksAssigned.push(block.id);
    });

    var params = {"id_blocks": blocksAssigned};
    $http.put('http://172.19.143.87:8000/api/students/'+ paramValue +'/all_blocks', params,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
    }, function errorCallback(response) {
    });

    //update info
    $scope.student.id_entry = $scope.entry.id;
    $http.put('http://172.19.143.87:8000/api/students/' + paramValue, $scope.student,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/students" );
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/students" );
  };

  $scope.loadList = function (){
    $http.get('http://172.19.143.87:8000/api/students',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.students = response.data;
    }, function errorCallback(response) {
    });

  };

  $scope.delete = function(id) {
    $http.delete('http://172.19.143.87:8000/api/students/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

}]);
