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
      // $http.get('http://172.19.143.87:8000/api/faculty/'+$scope.facultyData.id+'/blockpreferences',
      // // $httpParamSerializer(userInfo),
      // {headers: {'Content-Type': 'application/json'}})
      // .then(function successCallback(response) {

      //     $scope.courses = response.data.courses;
      //     console.log($scope.courses);

      // }, function errorCallback(response) {
      //     console.log(response);
      // });
  };

  $scope.submitBlockPreferences = function() {

  	var blockIdsPreferences = [];
  	for (var i = 0; i < $scope.blocks.length; i++) {
  		if ($scope.blocks[i].preference) {
  			blockIdsPreferences.push($scope.blocks[i].block_id);
  		}
  		console.log(blockIdsPreferences);
  	}
  }

  $scope.getCoursePreferences = function() {
      $http.get('http://172.19.143.87:8000/api/faculty/'+$scope.facultyData.id+'/coursepreferences',
      // $httpParamSerializer(userInfo),
      {headers: {'Content-Type': 'application/json'}})
      .then(function successCallback(response) {

          $scope.courses = response.data.courses;
          console.log($scope.courses);

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

    $http.put('http://172.19.143.87:8000/api/faculty/'+$scope.facultyData.id+'/coursepreferences',
    // $httpParamSerializer(userInfo),
    params,
    {headers: {'Content-Type': 'application/json'}})
    .then(function successCallback(response) {
        console.log(response);
        alert("Thank you, preference list updated successfully! ");

    }, function errorCallback(response) {
        console.log(response);
    });
  }

}]);