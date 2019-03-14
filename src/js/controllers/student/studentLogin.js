//studentLogin.js
angular
.module('app')
.controller('studentLogin', ['$scope', function($scope) {
  $scope.contacts = [];

  $scope.login = function() {
    $scope.contacts.push({name: $scope.contactname, number: $scope.contactnumber});
    console.log($scope.contacts);
  }
}]);