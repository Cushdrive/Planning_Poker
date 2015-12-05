(function () {
  
  var estimateService = function ($http,urlService) {
    
    var getMyStoryEstimates = function(name,story) {
      return $http(
          {
            url: urlService.getEstimateURL(),
            method: "GET",
            params: {"user": name,"story": story, "visible": true}
          }
        )
        .then(function(response) {
          return response.data;
      });
    };

    var getMyEstimates = function(name) {
      return $http(
          {
            url: urlService.getEstimateURL(),
            method: "GET",
            params: {"user": name, "story": "*"}
          }
        )
        .then(function(response) {
          return response.data;
      });
    };

    var getAllEstimates = function() {

    };

    var hideEstimates = function() {
      return $http.post(urlService.getEstimateURL(),{
        visible:false
      })
      .then(function(response) {
        return response.data;
      });      
    };

    var getVisibleEstimates = function() {
      return $http(
          {
            url: urlService.getEstimateURL(),
            method: "GET",
            params: {"user": "*", "story": "*","visible": true}
          }
        )
        .then(function(response) {
          return response.data;
      });
    };

    var getAllCSV = function() {
      return $http(
          {
            url: urlService.getCSVURL(),
            method: "GET"
          }
        )
        .then(function(response) {
          return response.data;
      });
    };

    var deleteEstimates = function() {};

    var postMyEstimate = function(name,story,points,description) {
      return $http.put(urlService.getEstimateURL(),{
        user:name,
        story:story,
        points:points,
        description:description
      })
      .then(function(response) {
        return response.data;
      });
    };

    var blockUpdates = function() {};

    var unblockUpdates = function() {};


    return {
      hideEstimates: hideEstimates,
      getMyStoryEstimates: getMyStoryEstimates,
      postMyEstimate: postMyEstimate,
      getVisibleEstimates: getVisibleEstimates,
      getMyEstimates: getMyEstimates,
      getAllCSV: getAllCSV
    };
  };
  
  var module = angular.module("planningPoker");
  //Easiest way to register a service with angular
  module.factory("estimateService", ['$http','urlService', estimateService]);
}());