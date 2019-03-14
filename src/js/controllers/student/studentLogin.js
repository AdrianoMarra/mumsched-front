//studentLogin.js
angular
.module('app')
.controller('studentLogin', ['$scope', '$http', function($scope, $http) {
  $scope.contacts = [];

  $scope.login = function() {
    $scope.contacts.push({name: $scope.contactname, number: $scope.contactnumber});
    getDataFromApi();
  }

  function getDataFromApi() {
    // Simple GET request example:
    $http({
      method: 'GET',
      url: 'http://www.apilayer.net/api/live?access_key=646037689b8b5f304fd20d3c85bba01f&format=1&currencies=AUD,BRL,EUR'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

}]);

    // if (typeof(Storage) !== "undefined") {
    //   // console.log($scope.contacts);
    //   localStorage.userName = $scope.contactname;
    // } else {
    //   console.log("Sorry! No Web Storage support..");
    // }