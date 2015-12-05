(function () {
  
  var urlService = function ($location) {
    var constURLStart = "views";
    //Update these constants if the server-side route changes.
    var constEstimateCrumb = "estimate";
    var constCSVCrumb = "CSV";
    
    var getBaseURL = function() {
      var url = $location.absUrl();
      return url.substring(0,url.search(constURLStart));
    };

    var getEstimateURL = function() {
      return getBaseURL() + constEstimateCrumb;
    };

    var getCSVURL = function() {
      return getBaseURL() + constCSVCrumb;
    };

    return {
      getBaseURL: getBaseURL,
      getEstimateURL: getEstimateURL,
      getCSVURL: getCSVURL
    };
  };
  
  var module = angular.module("planningPoker");
  //Easiest way to register a service with angular
  module.factory("urlService", ['$location',urlService]);
}());