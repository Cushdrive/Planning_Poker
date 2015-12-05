(function () {

var myApp = angular.module('planningPoker');
  
var mainController = function ($scope,$location,userservice) {
  $scope.name = "";
  $scope.type = "Participant";
  
  $scope.view = function () {
    //Now that the user is transitioning to the play template, update the service.
    userservice.setName($scope.name);
    userservice.setType($scope.type, $scope);
    if ($scope.name != "") {
      if ($scope.type == "Moderator") {
        $location.path("/moderate");
      }
      else {
        //Route to the play template.
        $location.path("/participate");
      }
    }
  };

}; //end controller implementation

//By passing an array which includes $scope and $http, we avoid issues that result from
//using minified code.
myApp.controller('MainController',['$scope', '$location', 'userservice', mainController]);
  
}()); 