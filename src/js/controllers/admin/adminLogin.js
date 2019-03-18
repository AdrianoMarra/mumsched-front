//adminLogin.js
angular
.module('app')
.controller('adminLogin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  
  var adminData = JSON.parse(localStorage.getItem('adminData'));
  if(adminData != undefined){
    $state.go('appSimple.adminDashboard')
  }

  $scope.login = function() {
    $scope.userInfo = [];
    $scope.userInfo.push({email: $scope.adminUsername, password: $scope.adminPassword});
    validateLogin($scope.userInfo[0]);
  }

  function validateLogin(userInfo) {

    $http.post(
      'http://172.19.143.87:8000/api/login/admin',
      $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function successCallback(response) {

        if (response.data.response == false) {
          showErrorMsg();
        } else {
          createSession(response.data.response)
        }

      }, function errorCallback(response) {
        console.log(response);
      });
  }

  function showErrorMsg() {
    alert("Username or password don't match.");
  }

  function createSession(resp) {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('adminData', JSON.stringify(resp));
      $state.go('appSimple.adminDashboard');
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

  $scope.logout = function() {
    localStorage.removeItem("adminData");
    $state.go('appSimple.home')
  }

}]);



