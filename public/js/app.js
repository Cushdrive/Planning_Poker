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
		var menuOpen = false;
		var stoptime = "";

		var publishtimeout = function () {
			$interval.cancel(stoptime);
			$scope.$broadcast('onTimerTimeout',$scope.timeout);
			$scope.timeout = "";
		};

		$scope.time = function () {
			var timeout = Number($scope.timeout);
			$interval.cancel(stoptime);
			if (timeout != "NaN") {
				timeout = timeout * 60000;
				stoptime = $interval(publishtimeout,timeout);
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