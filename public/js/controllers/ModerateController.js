(function () {

var myApp = angular.module('planningPoker');
  
var moderateController = function ($scope,$location,estimateService,userservice) {
	$scope.estimates = {};
	$scope.menustate = "menuclosed";
	$scope.average = 0;
	$scope.highestuser = "";
	$scope.highestpoints = 0;
	$scope.lowestuser = "";
	$scope.lowestpoints = 0;
	$scope.csv = "";

	var ResetStats = function() {
		$scope.average = 0;
		$scope.highestuser = "";
		$scope.highestpoints = 0;
		$scope.lowestuser = "";
		$scope.lowestpoints = 0;		
	};

	var CalculateStats = function() {
		var runningsum = 0;
		var currentPoints = 0;
		ResetStats();

		if (($scope.estimates) && ($scope.estimates.length > 0)) {

			$scope.lowestpoints = Number($scope.estimates[0].points);
			$scope.lowestuser = $scope.estimates[0].user;
		
			for (i = 0; i < $scope.estimates.length; i++) {

				currentPoints = Number($scope.estimates[i].points);
				runningsum = runningsum + currentPoints;

				if (currentPoints < $scope.lowestpoints) {
					$scope.lowestpoints = currentPoints;
					$scope.lowestuser = $scope.estimates[i].user;
				}
				else if (currentPoints == $scope.lowestpoints) {
					if ($scope.lowestuser != $scope.estimates[i].user) {
						$scope.lowestuser = $scope.lowestuser + ", " + $scope.estimates[i].user;
					}
				}
				
				if (currentPoints > $scope.highestpoints) {
					$scope.highestpoints = currentPoints;
					$scope.highestuser = $scope.estimates[i].user;
				}
				else if (currentPoints == $scope.highestpoints) {
					if ($scope.highestuser != $scope.estimates[i].user) {
						$scope.highestuser = $scope.highestuser + ", " + $scope.estimates[i].user;
					}
				}	
			}
			$scope.average = (runningsum / $scope.estimates.length);
		}
	};

	var onEstimatesError = function (err) {
		$scope.errorString = "oops";
	};

	var onEstimatesComplete = function (data) {
		$scope.estimates = data.estimates;
		CalculateStats();
	};

	var onCSVError = function (err) {
		$scope.errorString = "oops";
	};

	var onCSVComplete = function (data) {
		$scope.csv = data;
	};

	var refreshPage = function() {
		estimateService.getVisibleEstimates()
		.then(onEstimatesComplete,onEstimatesError);

		estimateService.getAllCSV()
		.then(onCSVComplete,onCSVError);
	};

	//Handle the menu button click.
	$scope.$on('onClear', function (event, data) {
		 estimateService.hideEstimates()
  		.then(onEstimatesComplete,onEstimatesError);
  	});

  	//Handle the menu timer timeout.
	$scope.$on('onTimerTimeout', function (event, data) {
		refreshPage();	 
  	});

	refreshPage();

}; //end controller implementation

//By passing an array which includes $scope and $http, we avoid issues that result from
//using minified code.
myApp.controller('ModerateController',['$scope', '$location', 'estimateService', 'userservice', moderateController]);
  
}()); 