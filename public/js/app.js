(function () {
	//The first parameter is the module name.
	//The second parameter is an array of dependencies.
	var myApp = angular.module('planningPoker',["ngRoute"]);
	//Update if the endpoint name were to change.
	myApp.constant("appname","estimate");

	//The configuration function will contain the routing rules.
	myApp.config(function ($routeProvider) {
		$routeProvider
			.when("/main", {
				templateUrl: "/views/main.html",
				controller: "MainController"
			})
			.when("/participate", {
				templateUrl: "/views/participate.html",
				controller: "ParticipateController"
			})
			.when("/moderate", {
				templateUrl: "/views/moderate.html",
				controller: "ModerateController"
			})
			.otherwise({redirectTo: "/main"});
	});

	//Setup a controller so we can bubble menu click information down to the individual controllers
	var menuController = function ($scope, $interval) {
		$scope.timeout = "";
		$scope.timerDisabled = false;
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
			$scope.$broadcast('onMenuToggle',menuOpen);
		};

		$scope.$on('onMenuClose',function(event,data) {
			menuOpen = false;
		});

	}; //end controller implementation

	myApp.controller('MenuController',['$scope', '$interval', menuController]);

}());