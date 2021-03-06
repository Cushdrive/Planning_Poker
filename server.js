var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = Number(process.env.PORT || 8080);
var json2csv = require('json2csv');
var fields = ['timestamp', 'user', 'story','points','description','visible'];
app.use(bodyParser.json());

var defaultEstimate1 = {
	timestamp: (new Date).toLocaleString(),
	user: "test",
	story: "BAXNHP-XXXX",
	points: "5",
	description: "This is a test.",
	visible: true
};

//For new estimates, create a new array for the user and add all estimates for the user at the end. 
//Other entries not matching the user go into a separate new array. Insert the new entry at the end 
//of the user array, and then join the two arrays.

var estimateArray = { estimates:[], csv: ""};
//estimateArray.estimates.push(defaultEstimate1);

var compareEstimateTimestamp = function(a,b) {
	var returnVal = 0;
	if (a.timestamp < b.timestamp) {
		returnVal = -1;
	}
	else if (a.timestamp > b.timestamp) {
		returnVal = 1;
	}
	return returnVal;
}

//console.log(JSON.stringify(estimateArray));

app.use(express.static(__dirname + '/public'));

//Function inserts a new entry in the right position within the array given the name of the person
//providing the estimate.
app.insertNewEstimate = function(newObj) {

	if (estimateArray.estimates.length == 0) {
		//Insert at the beginning of the array.
		estimateArray.estimates.splice(0,0,newObj);
		returnVal = estimateArray;
	}
	else {
		//Find the insert position based on the user
		var i;
		var userAdded = false;

		for (i = 0; i < estimateArray.estimates.length; i++) {
			if (estimateArray.estimates[i].user == newObj.user) {
				if (userAdded == false) {
					//Splicing in this way ensures that the most recent estimate comes first in the array.
					estimateArray.estimates.splice(i,0,newObj);
					userAdded = true;
					break;	
				}
			}
		}

		//If we never found another entry for this user, just add them to the end of the array.
		if (userAdded == false) {
			estimateArray.estimates.push(newObj);
		}
	}
};

app.updateAllEstimates = function(valuesObject) {
	var currentVal,i;
	for (var currentProp in valuesObject) {
		currentVal = valuesObject[currentProp];

		for (i = 0; i < estimateArray.estimates.length; i++) {
			estimateArray.estimates[i][currentProp] = currentVal;
		};
	}
};


app.filterEstimatesByProperties = function(filterObject,objectForSort) {
	var i,j,currentVal,foundProp,returnVal;

	//objectForSort is an optional parameter. If nothing is provided, assume the user
	//wants to sort the estimates data member.
	if (typeof(objectForSort) == 'undefined') {
		objectForSort = estimateArray;
	}

	if (objectForSort.estimates.length > 0) {

		//Loop over all of the filter criteria, doing incremental filtering.
		//Filter array should look like [{propName: name, propVal: val}, ... ]
		for (var currentProp in filterObject) {
			currentVal = filterObject[currentProp];
			if (currentVal != "*") {
				//console.log("Filtering on property: " + currentProp + ", with value: " + currentVal)
				foundProp = false;
				returnVal = {estimates:[]};
				for (i = 0; i < objectForSort.estimates.length; i++) {
					if (String(objectForSort.estimates[i][currentProp]) === String(currentVal)) {
						foundProp = true;
						returnVal.estimates.push(objectForSort.estimates[i]);
					}
				}
				//console.log("Number of estimates remaining after filtering: " + returnVal.estimates.length)
				//This will allow us to continue the incremental filtering.
				if (foundProp) {
					objectForSort = returnVal;
				}
			}
		}

	}
	//Note that an empty array will be returned if the filter property is not valid.
	return returnVal;
};

app.put('/estimate', function (request,response) {
	//console.log("Estimate Posted: " + request.body);

	var newObj = {
		timestamp: (new Date).toLocaleString(),
		user: request.body.user,
		story: request.body.story,
		points: request.body.points,
		description: request.body.description,
		visible: true
	};
	app.insertNewEstimate(newObj);
	//console.log(JSON.stringify(estimateArray));
	//console.log(JSON.stringify(app.filterEstimatesByProperties([{propName:"user",propVal:newObj.user}])));
	response.status(200).json(app.filterEstimatesByProperties({"user": newObj.user}));
});

app.post('/estimate', function (request,response) {
	//console.log("Moderator Posted: " + request.body);
	app.updateAllEstimates(request.body);
	response.status(200).json(app.filterEstimatesByProperties({"visible": true}));
});

app.get('/estimate', function (request,response) {
	//console.log(request.query.name);
	//console.log(estimateArray.estimates);
	response.status(200).json(app.filterEstimatesByProperties(request.query));
});

app.get('/csv', function (request,response) {
	if (estimateArray.estimates.length > 0) {
		//console.log("Estimates array is populated.");
		//console.log("JSON String: " + JSON.stringify(estimateArray));
		json2csv({ data: estimateArray.estimates, fields: fields, newLine: '\n' }, function(err, csv) {
		  if (err) console.log(err);
		  //console.log("CSV String: " + csv);
		  response.status(200).send(csv);
		});		
	}
});

var server = app.listen(port, function() {
    //console.log('Listening on port ' + port);
});