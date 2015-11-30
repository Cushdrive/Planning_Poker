$(document).ready(function(){
	$("#send-message").click(function () { 
		var addMessageCallback = function (resp) {
			//Clear the messages div and let the updateMessages function repopulate.
			$("#message-div").empty();
			updateMessages();
		};

		var ajaxpost = {
			type: "POST",
			url: "/ajax/addMessage",
			contentType: "application/json",
			data: JSON.stringify(
				{
					message: $("#estimate-text").val()
				}),
			success: addMessageCallback
		};
		$("#estimate-text").val("");
		$.ajax(ajaxpost);
	});

    var getSuccessFunc = function (getEstimatesResponse) {
    	console.log("Called getSuccessFunc.");
    	for (var j = 0; j < getEstimatesResponse.estimates.length; j++) {
    		prependEstimate(getEstimatesResponse.estimates[j]);
    	}
    };

    var prependEstimate = function (estimate) {
    	console.log("Called prependEstimate");
    	var humanreadabletime = new Date(estimate.time).toLocaleString();

    	var html = "<div class='message'><p class='message-timestamp'>" + humanreadabletime
    	html = html + "</p><p class='message-text'>" + estimate.message
    	html = html + "</p></div>"

    	$("#message-div").prepend(html);
    };

    //Get the list of default estimates.
    var updateMessages = function () {
    	//First setup the request object.
		var ajaxobj = {
	     	type: "GET",
	        url: "/ajax/estimates",
	        success: getSuccessFunc,
	        dataType: 'json'
	    };
	    //Perform the get call.
	    $.ajax(ajaxobj);
    };

    //This will get called when the page first loads.
    updateMessages();
});