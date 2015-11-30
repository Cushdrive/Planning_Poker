(function () {

var myApp = angular.module('planningPoker');
  
var participateController = function ($scope,$location,estimateService,userservice) {
	$scope.name = userservice.getName();	
	$scope.estimates = {};
	$scope.id = "";
	$scope.points = "";
	$scope.description = "";

	var ClearFields = function () {
		$scope.id = "";
		$scope.points = "";
		$scope.description = "";
	};

	//Handle the menu button click.
	$scope.$on('onMenuToggle', function (event, data) {
    	ClearFields();
  	});

	var onEstimatesError = function (err) {
		$scope.errorString = "oops";
	};

	var onEstimatesComplete = function (data) {
		$scope.estimates = data.estimates;
		$scope.points = "";
		$scope.description = "";
	};

	$scope.submit = function () {
		estimateService.postMyEstimate($scope.name,$scope.id,$scope.points,$scope.description)
		.then(onEstimatesComplete,onEstimatesError);
	};

	if (userservice.getName() == "") {
		$location.path("/main");
	}
	estimateService.getMyEstimates($scope.name)
	.then(onEstimatesComplete,onEstimatesError);

}; //end controller implementation

//By passing an array which includes $scope and $http, we avoid issues that result from
//using minified code.
myApp.controller('ParticipateController',['$scope', '$location', 'estimateService', 'userservice', participateController]);
  
}()); 