//studentLogin.js
angular
.module('app')
.controller('student', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
  $scope.studentData = JSON.parse(localStorage.getItem('studentData'));
  if($scope.studentData == undefined){
    $state.go('appSimple.loginStudent')
  }

  $scope.logout = function() {
    localStorage.removeItem("studentData");
    $state.go('appSimple.home')
  }

  $scope.saveSection = function (section_id) {
  	console.log(section_id)
  	$scope.sectionRegister = section_id;
  }

  $scope.confirmRegistration = function () {
  	//call the api route saving it 
  	$state.go('appSimple.studentDashboard.registerToCourses')
  } 

  $scope.cancelRegistration = function () {
  	// just go back to the previous page
  	$state.go('appSimple.studentDashboard.registerToCourses')
  }

  $scope.blocks = [];
  $scope.coursesAvailable = function () {

	$scope.blocks = [{
	"description": "April 2019",
	"courses": [
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		},
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		},  		
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		}
	]
	},
	{
	"description": "May 2019",
	"courses": [
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		},
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		}
	]
	},
	{
	"description": "June 2019",
	"courses": [
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		},
		{
			"courseCode": "CS201",
			"courseName": "MPP",
			"professor": "Lerman",
			"capacity": 30,
			"enrolled": 23,
			"seatsAvailable": 7
		}
	]
	}];
  }


  $scope.coursesToRegister = function () {

	$scope.blocks = [{
		"description": "April 2019",
		"courses": [
			{	
				"section_id": "0",
				"courseCode": "CS201",
				"courseName": "MPP",
				"professor": "Lerman",
				"capacity": 30,
				"enrolled": 23,
				"seatsAvailable": 7
			},
			{
				"section_id": "1",
				"courseCode": "CS201",
				"courseName": "MPP",
				"professor": "Lerman",
				"capacity": 30,
				"enrolled": 23,
				"seatsAvailable": 7,
			},  		
			{
				"section_id": "2",
				"courseCode": "CS201",
				"courseName": "MPP",
				"professor": "Lerman",
				"capacity": 30,
				"enrolled": 23,
				"seatsAvailable": 7
			}
		]
		}];

  }


}]);