// SIGMA SERVER-SIDE EMBED API - PUBLIC QUICKSTART

// USE EXPRESS WEB FRAMEWORK:
var express = require('express');
var app = express();

// FETCH PATH FOR FOLDER CONTAINING HTML PAGE WE ARE EMBEDDING INTO:
app.get('/', function(request, response) 
{
response.sendFile(__dirname + '/index.html');
}
);

// DEFINE A ROUTE HANDLER FOR GET REQUESTS TO GIVEN URL:
app.get('/api/generate_embed_url', generate_embed_url);

// CALL FUNCTION AND SET ANY PARAMETERS
function generate_embed_url(request, response) 
{
	// SET SIGMA EMBED URL VALUE:
	// THIS VALUE IS CALLED "PUBLIC LINK" IN SIGMA PORTAL:
	const EMBED_PATH = "https://app.sigmacomputing.com/embed/1-1JMR8QAuJHo1c5qXRjVwGH"; 

	// SEND URL TO CLIENT:
	response.status(200).send({url:EMBED_PATH});
}

//START EXPRESS SERVER LISTENING ON PORT 3001:
app.listen(3000);