const port = 8080;
var http = require('http');
var jsonDB = require('node-json-db');

function handleRequest(request, response)
{
	// set CORS headers
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
	// treat response as a plain text
	response.writeHead(200, {"Content-Type": "text/plain"});
	// finally generate random number from 0 to 9	
    response.end(Math.floor(Math.random() * 10.0).toString());
}

var db = new jsonDB('backOfficeDB', true, true);
// debug initialization for db
db.push('/range/fromNumber', '0');
db.push('/range/toNumber', '9');

var server = http.createServer(handleRequest);
// debug reading from db
console.log('Number rabge from ' + db.getData('/range/fromNumber') + ' to ' + db.getData('/range/toNumber'));

// start our server
server.listen(
	port, 
	function()
	{
    	console.log('Server listening on: http://localhost: ' + port);
	}
);