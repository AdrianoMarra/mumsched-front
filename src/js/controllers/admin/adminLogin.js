//adminLogin.js
angular
.module('app')
.controller('adminLogin', ['$scope', function($scope) {
  $scope.contacts = [];
  $scope.login = function() {
    $scope.contacts.push({name: $scope.contactname, number: $scope.contactnumber});

    console.log($scope.contacts);

  }
}]);