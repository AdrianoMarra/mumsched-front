//home.js
angular
.module('app')
.controller('home', ['$scope', function($scope) {
  $scope.contacts = [];
  $scope.home = function() {
    // $scope.contacts.push({name: $scope.contactname, number: $scope.contactnumber});
  }
}]);