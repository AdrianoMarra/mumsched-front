//facultyLogin.js
angular
.module('app')
.controller('facultyLogin', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  
  var facultyData = JSON.parse(localStorage.getItem('facultyData'));
  if(facultyData != undefined){
    $state.go('appSimple.facultyDashboard')
  }

  $scope.login = function() {
    $scope.userInfo = [];
    $scope.userInfo.push({email: $scope.facultyUsername, password: $scope.facultyPassword});
    validateLogin($scope.userInfo[0]);
  }

  function validateLogin(userInfo) {

    $http.post(
      'http://172.19.143.87:8000/api/login/faculty',
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
      localStorage.setItem('facultyData', JSON.stringify(resp));
      $state.go('appSimple.facultyDashboard');
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  }

}]);



