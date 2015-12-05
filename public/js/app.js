(function () {
	//The first parameter is the module name.
	//The second parameter is an array of dependencies.
	var myApp = angular.module('planningPoker',["ngRoute"]);

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

}());