(function () {	
	//Setup a service that all controllers will have access to for information sharing.
	var userservice = function(){
		
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
	};

	var module = angular.module("planningPoker");
  	//Easiest way to register a service with angular
  	module.factory("userservice", ['$http','urlService', userservice]);

}());