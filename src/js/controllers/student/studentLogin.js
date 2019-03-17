//studentLogin.js
angular
.module('app')
.controller('studentLogin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  
  var userName = localStorage.userName;
  if(userName != undefined){
    $state.go('appSimple.studentDashboard')
  }

  $scope.userInfo = [];
  $scope.login = function() {
    $scope.userInfo.push({userName: $scope.studentUsername, password: $scope.studentPassword});
    validateLogin($scope.userInfo[0]);
  }

  function validateLogin(userInfo) {
    $http.get(
      'http://www.apilayer.net/api/live?access_key=646037689b8b5f304fd20d3c85bba01f&format=1&currencies=AUD,BRL,EUR',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {
        if(userInfo.userName == "adriano" && userInfo.password == "123") {
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
      localStorage.userName = userInfo.userName;
      $state.go('appSimple.studentDashboard');
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

  $scope.logout = function() {
    localStorage.removeItem("userName");
    $state.go('appSimple.home')
  }

}]);



