//studentLogin.js
angular
    .module('app')
    .controller('student', ['$scope', '$http', '$httpParamSerializer', '$state', function($scope, $http, $httpParamSerializer, $state) {
        
        $scope.responseData = [];
        $scope.studentData = JSON.parse(localStorage.getItem('studentData'));
        if ($scope.studentData == undefined) {
            $state.go('appSimple.loginStudent');
        }

        $scope.logout = function() {
            localStorage.removeItem("studentData");
            $state.go('appSimple.home');
        }

        $scope.validateRegData = function() {
            if ($scope.courseRegisterInfo.sectionRegister == undefined ||
                $scope.courseRegisterInfo.courseRegister == undefined ||
                $scope.courseRegisterInfo.blockRegister == undefined) {
                // $state.go('appSimple.studentDashboard.registerToCourses');
            }
        }

        $scope.submitRegistration = function(sectionId, courseName, block) {
            $scope.courseRegisterInfo = { "sectionRegister": sectionId, "courseRegister": courseName, "blockRegister": block };
        }

        $scope.confirmRegistration = function() {

            var params = { "id_section": $scope.courseRegisterInfo.sectionRegister, "id_student": $scope.studentData.id };

            $http.post('http://172.19.143.87:8000/api/registrations', params, 
                {headers: {'Content-Type': 'application/json'}})
                .then(function successCallback(response) {

                    console.log(response.data);
                    $state.go('appSimple.studentDashboard.registerToCourses');


                }, function errorCallback(response) {
                    console.log(response);
                });
        }

        $scope.cancelRegistration = function() {
            $state.go('appSimple.studentDashboard.registerToCourses');
        }

        $scope.coursesAvailable = function() {

            $http.get('http://172.19.143.87:8000/api/students/' + $scope.studentData.id + '/courses_available',
                // $httpParamSerializer(userInfo),
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function successCallback(response) {

                    $scope.responseData = response.data;
                    console.log($scope.responseData);

                }, function errorCallback(response) {
                    console.log(response);
                });
        }

        $scope.getCoursesToRegister = function() {

            $http.get('http://172.19.143.87:8000/api/students/' + $scope.studentData.id + '/registration',
                // $httpParamSerializer(userInfo),
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function successCallback(response) {

                    $scope.responseData = response.data;

                }, function errorCallback(response) {
                    console.log(response);
                });
        }

        $scope.studentSchedule = function() {
            $http.get('http://172.19.143.87:8000/api/students/' + $scope.studentData.id + '/schedule',
                // $httpParamSerializer(userInfo),
                {headers: {'Content-Type': 'application/json'}})
                .then(function successCallback(response) {

                    $scope.responseData = response.data;
                    console.log($scope.responseData);

                }, function errorCallback(response) {
                    console.log(response);
                });
        }

    }]);