//var bcrypt = require('bcrypt')
var express = require('express');
var mongodb = require('mongodb');
//#############################################
// These const/vars should be changed to use your own 
// ID, password, databse, and ports
const SERVER_PORT = 8155;
var user = 's_thapamagar';
var password = 'A00430095';
var database = 's_thapamagar';
//#############################################
//These should not change, unless the server spec changes
var host = '127.0.0.1';
var port = '27017'; // Default MongoDB port
// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
host + ':' + port + '/' + database;
console.log(connectionString);

//CORS Middleware, causes Express to allow Cross-Origin Requests
// Do NOT change anything here
var allowCrossDomain = function (req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers','Content-Type');
next();
};
//set up the server variables
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));

//#############################################
//the var for the rectangle collections
var rectanglesCollection;
const NAME_OF_COLLECTION = 'rectangles';
//#############################################
//now connect to the db
mongodb.connect(connectionString, function (error, db) {
	if (error) {
		throw error;
	}//end if
	rectanglesCollection = db.collection(NAME_OF_COLLECTION);
	// Close the database connection and server when the application ends
	process.on('SIGTERM', function () {
	console.log("Shutting server down.");
	db.close();
	app.close();
	});
	//now start the application server
	var server = app.listen(SERVER_PORT, function () {
	console.log('Listening on port %d',
	server.address().port);
	});
})


app.post('/saveRectangle', function (request, response) {
	rectanglesCollection.insert(request.body, 
		function (err, result) {//use empty to get all records
			if (err) {
				return response.send(400,'An error occurred saving a record.');
				}//end if
			return response.send(200, "Record saved successfully.");
		});
	});
	
app.post('/readRectangles', function (request, response) {
	rectanglesCollection.find(
		//skip the argument (empty key) to get all records 
		function (err, result) {
			if (err) {
				return response.send(400,'An error occurred retrieving records.');
			}//end if
			//now result is expected to be an array of rectangles
			result.toArray(
				function (err, resultArray) {
					if (err) {
						return response.send(400, 'An error occurred processing your records.');
					}//end if
					//if succeeded, send it back to the calling thread
				return response.send(200, resultArray);
			});
		});
	});