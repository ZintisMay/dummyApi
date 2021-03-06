// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server 
// ==============================================================================

var app = express(); // Tells node that we are creating an "express" server
var PORT = process.env.PORT || 1110; // Sets an initial port. We'll use this later in our listener

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// ==============================================================================
// LISTENER
// The below code effectively "starts" our server 
// ==============================================================================

instructionObject = {
	"go to here for an object":"/dummy/data/object" ,
	"go to here for an array": "/dummy/data/array",
	"post here a number": "/saveNumbers"
}

dummyObject = {
	stuff: "is here",
	things: "are also here",
	weHaveNumbers: 1337,
	anArray: [1, 2, 3, 4],
	andSubObject: {
		with:"just",
		a:"little",
		information:"!"
	}
}

dummyArray = [0]
var number = 0;
for(x = 1;x < 20; x++){
	dummyArray.push(dummyArray[dummyArray.length-1] + x);

}

userArray = [];

app.post('/saveNumbers', function(req, res){
	
	for(x in req.body){
		userArray.push(req.body[x]);
	}

	if(userArray.length > 5){
		userArray.shift();
	}

	res.json(userArray);
});

app.get('/', function(req, res){
	res.json(instructionObject);
});

app.get('/dummy/data/array', function(req, res){
	res.json(dummyArray);
});

app.get('/dummy/data/object', function(req, res){
	res.json(dummyObject);
});

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});