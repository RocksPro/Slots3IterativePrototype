const port = 8080;
var http = require('http');
var jsonDB = require('node-json-db');

var db = new jsonDB('backOfficeDB', true, true);
// debug initialization for db
db.push('/range/fromNumber', '0');
db.push('/range/toNumber', '9');

function logBackOfficeParameters()
{
	console.log('Number range from ' + db.getData('/range/fromNumber') + ' to ' + db.getData('/range/toNumber'));
}

function handleRequest(request, response)
{
	function generateRandomNumber()
	{
		var from = db.getData('/range/fromNumber');
		var to = db.getData('/range/toNumber');
		var offset = parseFloat(parseInt(from));
		var multiplier = parseFloat((parseInt(to) - parseInt(from) + 1).toString());
		return Math.floor(offset + Math.random() * multiplier).toString();
	}

	// set CORS headers
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
	// treat response as a plain text
	response.writeHead(200, {"Content-Type": "text/plain"});
	if (request.url === '/ask/randomnumber')
		response.end(generateRandomNumber());
	if (request.url === '/range/from')
		response.end(db.getData('/range/fromNumber'));
	else if (request.url === '/range/to')
		response.end(db.getData('/range/toNumber'));
	else if (request.url.indexOf('/write/from___') === 0)
	{
		var newValue = request.url.split('___')[1];
		response.end('range.from changed from ' + db.getData('/range/fromNumber') + ' to ' + newValue);
		db.push('/range/fromNumber', newValue);
		logBackOfficeParameters();
	}
	else if (request.url.indexOf('/write/to___') === 0)
	{
		var newValue = request.url.split('___')[1];
		response.end('range.to changed from ' + db.getData('/range/toNumber') + ' to ' + newValue);
		db.push('/range/toNumber', newValue);
		logBackOfficeParameters();
	}
	else
    	response.end('unknown request');
}


var server = http.createServer(handleRequest);
// debug reading from db
logBackOfficeParameters();

// start our server
server.listen(
	port, 
	function()
	{
		console.log('Server listening on: http://localhost: ' + port);
	}
);