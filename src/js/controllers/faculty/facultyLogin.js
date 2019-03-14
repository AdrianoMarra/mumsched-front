//facultyLogin.js
angular
.module('app')
.controller('facultyLogin', ['$scope', function($scope) {
  $scope.contacts = [];
  $scope.login = function() {
    $scope.contacts.push({name: $scope.contactname, number: $scope.contactnumber});
  }
}]);