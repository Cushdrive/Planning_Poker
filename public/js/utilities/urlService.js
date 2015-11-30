(function () {
  
  var urlService = function ($location,appname) {
    var urlStartConstant = "views";
    
    var getBaseURL = function() {
      var url = $location.absUrl();
      return url.substring(0,url.search(urlStartConstant));
    };

    var getServiceURL = function() {
      return getBaseURL() + appname;
    };

    return {
      getBaseURL: getBaseURL,
      getServiceURL: getServiceURL
    };
  };
  
  var module = angular.module("planningPoker");
  //Easiest way to register a service with angular
  module.factory("urlService", ['$location','appname',urlService]);
}());