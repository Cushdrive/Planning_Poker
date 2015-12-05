
(function () {
	var myApp = angular.module('planningPoker');

	//Setup a controller so we can bubble menu click information down to the individual controllers
	var menuController = function ($scope, $interval) {
		$scope.timeout = "";
		$scope.timerDisabled = false;
		$scope.userHasPermission = false;
		var menuOpen = false;
		var stoptime = "";
		var intervals = 0;
		//Update the timer box every 10 seconds.
		var constCallInterval = 10000;

		var publishtimeout = function () {
			intervals -= 1;
			if (intervals > 0) {
				//e.g. (2 * 10,000)/1000 = 20 seconds
				$scope.timeout = ((intervals * constCallInterval)/1000) + " seconds";
			}
			else {
				$scope.timerDisabled = false;
				$interval.cancel(stoptime);
				$scope.$broadcast('onTimerTimeout',$scope.timeout);
				$scope.timeout = "";
			}
		};

		$scope.time = function () {
			var timeout = Number($scope.timeout);
			$interval.cancel(stoptime);
			if (timeout != "NaN") {
				$scope.timerDisabled = true;
				timeout = timeout * 60000;
				intervals = timeout/constCallInterval;
				stoptime = $interval(publishtimeout,constCallInterval);
			}
			
		};

		$scope.click = function () {
			menuOpen = !menuOpen;
			$scope.$broadcast('onClear',menuOpen);
		};

		$scope.$on('onPermissionUpdate',function(event,data) {
			if (data == "Moderator") {
				$scope.userHasPermission = true;
			}
			else {
				$scope.userHasPermission = false;
			}
		});

	}; //end controller implementation

	myApp.controller('MenuController',['$scope', '$interval', menuController]);

}());