//studentLogin.js
angular
.module('app')
.controller('studentLogin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  
  var studentData = JSON.parse(localStorage.getItem('studentData'));
  if(studentData != undefined){
    $state.go('appSimple.studentDashboard');
  }

  $scope.login = function() {
    $scope.userInfo = [];
    $scope.userInfo.push({email: $scope.studentUsername, password: $scope.studentPassword});
    validateLogin($scope.userInfo[0]);
  }

  function validateLogin(userInfo) {
    
    $http.post(
      'http://172.19.143.87:8000/api/login/student',
      userInfo,
      {headers: {'Content-Type': 'application/json'}})
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
      localStorage.setItem('studentData', JSON.stringify(resp));
      $state.go('appSimple.studentDashboard');
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

}]);



