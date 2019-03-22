//facultyLogin.js
angular
.module('app')
.controller('faculty', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.facultyData = JSON.parse(localStorage.getItem('facultyData'));
  if($scope.facultyData == undefined){
    $state.go('appSimple.loginFaculty')
  }

  $scope.logout = function() {
    localStorage.removeItem("facultyData");
    $state.go('appSimple.home')
  }

  $scope.getBlockPreferences = function() {
      $http.get('http://localhost:8000/api/faculty/'+$scope.facultyData.id+'/blockpreferences',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {

          $scope.blocks = response.data.blocks;
          console.log($scope.blocks);

      }, function errorCallback(response) {
          console.log(response);
      });
  };

  $scope.submitBlockPreferences = function() {
    var blockIdsPreferences = [];
    for (var i = 0; i < $scope.blocks.length; i++) {
      if ($scope.blocks[i].isPreference) {
        blockIdsPreferences.push($scope.blocks[i].id);
      }
    }

    var params = {"blocks_id": blockIdsPreferences};

    $http.put('http://localhost:8000/api/faculty/'+$scope.facultyData.id+'/blockpreferences',
    // $httpParamSerializer(userInfo),
    params,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
        alert("Thank you, preference list updated successfully! ");
    }, function errorCallback(response) {
        console.log(response);
    });
  }

  $scope.getCoursePreferences = function() {
      $http.get('http://localhost:8000/api/faculty/'+$scope.facultyData.id+'/coursepreferences',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {

          $scope.courses = response.data.courses;

      }, function errorCallback(response) {
          console.log(response);
      });
  }

  $scope.submitCoursePreferences = function() {
    var courseIdsPreferences = [];
    for (var i = 0; i < $scope.courses.length; i++) {
      if ($scope.courses[i].isPreference) {
        courseIdsPreferences.push($scope.courses[i].id);
      }
    }

    var params = {"courses_id": courseIdsPreferences};

    $http.put('http://localhost:8000/api/faculty/'+$scope.facultyData.id+'/coursepreferences',
    // $httpParamSerializer(userInfo),
    params,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
        alert("Thank you, preference list updated successfully! ");
    }, function errorCallback(response) {
        console.log(response);
    });
  }

  $scope.professorSchedule = function() {

      $http.get('http://localhost:8000/api/faculty/'+$scope.facultyData.id+'/schedules',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {

          $scope.schedule = response.data;

      }, function errorCallback(response) {
          console.log(response);
      });
  };

}]);