var http = require('http');
const port = 8080; 

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

var server = http.createServer(handleRequest);

// start our server
server.listen(
	port, 
	function()
	{
    	console.log('Server listening on: http://localhost: ' + port);
	}
);