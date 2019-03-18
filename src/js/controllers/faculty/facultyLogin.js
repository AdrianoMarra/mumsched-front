//facultyLogin.js
angular
.module('app')
.controller('facultyLogin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  
  var userName = localStorage.facultyName;
  if(userName != undefined){
    $state.go('appSimple.facultyDashboard')
  }

  $scope.userInfo = [];
  $scope.login = function() {
    $scope.userInfo.push({userName: $scope.facultyUsername, password: $scope.facultyPassword});
    validateLogin($scope.userInfo[0]);
  }

  function validateLogin(userInfo) {
    $http.get(
      'http://www.apilayer.net/api/live?access_key=646037689b8b5f304fd20d3c85bba01f&format=1&currencies=AUD,BRL,EUR',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {
        if(userInfo.userName == "faculty" && userInfo.password == "123") {
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
      localStorage.facultyName = userInfo.userName;
      $state.go('appSimple.facultyDashboard');
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

  $scope.logout = function() {
    localStorage.removeItem("facultyName");
    $state.go('appSimple.home')
  }

}]);



