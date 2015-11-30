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
				templateUrl: "main.html",
				controller: "MainController"
			})
			.when("/participate", {
				templateUrl: "participate.html",
				controller: "ParticipateController"
			})
			.when("/moderate", {
				templateUrl: "moderate.html",
				controller: "ModerateController"
			})
			.otherwise({redirectTo: "/main"});
	});

	//Setup a controller so we can bubble menu click information down to the individual controllers
	var menuController = function ($scope) {
		var menuOpen = false;

		$scope.click = function () {
			menuOpen = !menuOpen;
			$scope.$broadcast('onMenuToggle',menuOpen);
		};

		$scope.$on('onMenuClose',function(event,data) {
			menuOpen = false;
		});

	}; //end controller implementation

	myApp.controller('MenuController',['$scope', menuController]);

	//Setup a service that all controllers will have access to for information sharing.
	myApp.service('userservice',function(){
		
		var userInfo = {
			name: "",
			type: "Participant"
		};

		var setName = function(name) {
			userInfo.name = name;
		};

		var setType = function(type) {
			if ((type != "Participant") && (type != "Moderator")){
				type = "Participant";
			}
			userInfo.type = type;
		};

		var getType = function() {
			return userInfo.type;
		};

		var getName = function() {
			return userInfo.name;
		};

		return {
			setName: setName,
			getName: getName,
			setType: setType,
			getType: getType
		};
	});

}());