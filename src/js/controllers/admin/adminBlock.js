//adminBlock.js
angular
.module('app')
.controller('adminBlock', ['$scope', '$http', '$httpParamSerializer', '$state', '$location', '$filter', function($scope, $http, $httpParamSerializer, $state, $location, $filter) {
  
  /* If it is not logged in go to admin login page */
  $scope.adminName = localStorage.adminName;
  if($scope.adminName == undefined){
    $state.go('appSimple.loginAdmin')
  }

  $scope.isUpdate = false;
  $scope.entry = {};
  var paramValue = $location.search().id;

  $scope.startDay = "";
  $scope.startMonth = "";
  $scope.startYear = "";
  $scope.startDays = [];
  $scope.startMonths = [];
  $scope.startYears = [];

  var i = 1;
  while(i <= 31){
    $scope.startDays.push ({"id": i,"label": i });
    i++;
  };

  var i = 1;
  while(i <= 12){
    $scope.startMonths.push ({"id": i,"label": i });
    i++;
  };

  var i = 1;
  while(i <= 10){
    $scope.startYears.push ({"id": i+2015,"label": i+2015 });
    i++;
  };

  $scope.endDay = "";
  $scope.endMonth = "";
  $scope.endYear = "";
  $scope.endDays = [];
  $scope.endMonths = [];
  $scope.endYears = [];

  var i = 1;
  while(i <= 31){
    $scope.endDays.push ({"id": i,"label": i });
    i++;
  };

  var i = 1;
  while(i <= 12){
    $scope.endMonths.push ({"id": i,"label": i });
    i++;
  };

  var i = 1;
  while(i <= 10){
    $scope.endYears.push ({"id": i+2015,"label": i+2015 });
    i++;
  };

  if(paramValue) {
    $scope.isUpdate = true;
    $http.get('http://localhost:8000/api/blocks/' + paramValue,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {
        $scope.block = response.data;

        var startDate = new Date($scope.block.start_date);
        $scope.startDay = $scope.startDays.find(o => o.id == startDate.getDate());
        $scope.startMonth = $scope.startMonths.find(o => o.id == startDate.getMonth()+1);
        $scope.startYear = $scope.startYears.find(o => o.id == startDate.getFullYear());

        var endDate = new Date($scope.block.end_date);
        $scope.endDay = $scope.endDays.find(o => o.id == endDate.getDate());
        $scope.endMonth = $scope.endMonths.find(o => o.id == endDate.getMonth()+1);
        $scope.endYear = $scope.endYears.find(o => o.id == endDate.getFullYear());

        $scope.block.on_campus == 1 ? $scope.block.on_campus = true : $scope.block.on_campus = false;

      }, function errorCallback(response) {
    });
  } else {
    $scope.isUpdate = false;
  }

  $scope.create = function() {
    var startDate = $scope.startYear.id + "-" + $scope.startMonth.id + "-" + $scope.startDay.id;
    $scope.block.start_date = $filter('date')(startDate, "yyyy-MM-dd");

    var endDate = $scope.endYear.id + "-" + $scope.endMonth.id + "-" + $scope.endDay.id;
    $scope.block.end_date = $filter('date')(endDate, "yyyy-MM-dd");

    $scope.block.on_campus == true ? $scope.block.on_campus = 1 :$scope.block.on_campus = 0;

    $http.post('http://localhost:8000/api/blocks', $scope.block,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/blocks" );
    }, function errorCallback(response) {
    });
  };

  $scope.update = function() {
    var startDate = $scope.startYear.id + "-" + $scope.startMonth.id + "-" + $scope.startDay.id;
    $scope.block.start_date = $filter('date')(startDate, "yyyy-MM-dd");

    var endDate = $scope.endYear.id + "-" + $scope.endMonth.id + "-" + $scope.endDay.id;
    $scope.block.end_date = $filter('date')(endDate, "yyyy-MM-dd");

    $scope.block.on_campus == true ? $scope.block.on_campus = 1 :$scope.block.on_campus = 0;

    $http.put('http://localhost:8000/api/blocks/' + paramValue, $scope.block,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $location.path( "/admin/dashboard/blocks" );
    }, function errorCallback(response) {
    });
  };

  $scope.cancel = function() {
    $location.path( "/admin/dashboard/blocks" );
  };

  $scope.loadList = function (){
    $http.get('http://localhost:8000/api/blocks',
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function successCallback(response) {
      $scope.blocks = response.data;
    }, function errorCallback(response) {
    });
  };

  $scope.delete = function(id) {
    $http.delete('http://localhost:8000/api/blocks/' + id,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
      $state.reload();
    }, function errorCallback(response) {
    });
  };

}]);
