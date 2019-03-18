//adminLogin.js
angular
.module('app')
.controller('adminLogin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  
  var userName = localStorage.adminName;
  if(userName != undefined){
    $state.go('appSimple.adminDashboard')
  }

  $scope.userInfo = [];
  $scope.login = function() {
    $scope.userInfo.push({userName: $scope.adminUsername, password: $scope.adminPassword});
    validateLogin($scope.userInfo[0]);
  }

  function validateLogin(userInfo) {
    $http.get(
      'http://www.apilayer.net/api/live?access_key=646037689b8b5f304fd20d3c85bba01f&format=1&currencies=AUD,BRL,EUR',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {
        if(userInfo.userName == "admin" && userInfo.password == "123") {
          createSession(userInfo);
        } else {
          showErrorMsg();
        }
      }, function errorCallback(response) {
        showErrorMsg();
      });
  }

  function showErrorMsg() {
    alert("Username or password don't match.");
  }

  function createSession(userInfo) {
    if (typeof(Storage) !== "undefined") {
      localStorage.adminName = userInfo.userName;
      $state.go('appSimple.adminDashboard');
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

  $scope.logout = function() {
    localStorage.removeItem("adminName");
    $state.go('appSimple.home')
  }

}]);



