//adminEntry.js
angular
.module('app')
.controller('adminEntry', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', '$filter', function($scope, $http, $httpParamSerializer, $state, $location, $filter) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.isUpdate = false;
  $scope.entry = {};
  var paramValue = $location.search().id;

  $scope.day = "";
  $scope.month = "";
  $scope.year = "";

  $scope.days = [];
  var i = 1;
  while(i <= 31){
    $scope.days.push ({"id": i,"label": i });
    i++;
  };

  $scope.months = [];
  var i = 1;
  while(i <= 12){
    $scope.months.push ({"id": i,"label": i });
    i++;
  };

  $scope.years = [];
  var i = 1;
  while(i <= 10){
    $scope.years.push ({"id": i+2015,"label": i+2015 });
    i++;
  };

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://172.19.143.87:8000/api/entries/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.entry = response.data;

        var fullDate = new Date($scope.entry.date);
        $scope.day = $scope.days.find(o => o.id == fullDate.getDate());
        $scope.month = $scope.months.find(o => o.id == fullDate.getMonth()+1);
        $scope.year = $scope.years.find(o => o.id == fullDate.getFullYear());
      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.create = function() {
    var strDate = $scope.year.id + "-" + $scope.month.id + "-" + $scope.day.id;
    $scope.entry.date = $filter('date')(strDate, "yyyy-MM-dd");

    $http.post('http://172.19.143.87:8000/api/entries', $scope.entry,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/entries" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {
    var strDate = $scope.year.id + "-" + $scope.month.id + "-" + $scope.day.id;
    $scope.entry.date = $filter('date')(strDate, "yyyy-MM-dd");

    $http.put('http://172.19.143.87:8000/api/entries/' + paramValue, $scope.entry,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/entries" );
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/entries" );
  };

  $scope.loadList = function (){
    $http.get('http://172.19.143.87:8000/api/entries',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.entries = response.data;
    }, function errorCallback(response) {
    });
  };

  $scope.delete = function(id) {
    $http.delete('http://172.19.143.87:8000/api/entries/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

}]);
