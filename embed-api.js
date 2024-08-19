// // SIGMA SERVER-SIDE EMBED API - PUBLIC QUICKSTART

// // USE EXPRESS WEB FRAMEWORK:
// var express = require('express');
// var app = express();

// // FETCH PATH FOR FOLDER CONTAINING HTML PAGE WE ARE EMBEDDING INTO:
// app.get('/', function(request, response) 
// {
// response.sendFile(__dirname + '/index.html');
// }
// );

// // DEFINE A ROUTE HANDLER FOR GET REQUESTS TO GIVEN URL:
// app.get('/api/generate-embed-url', generate_embed_url);

// // CALL FUNCTION AND SET ANY PARAMETERS
// function generate_embed_url(request, response) 
// {
// 	// SET SIGMA EMBED URL VALUE:
// 	// THIS VALUE IS CALLED "PUBLIC LINK" IN SIGMA PORTAL:
// 	const EMBED_PATH = "https://app.sigmacomputing.com/embed/t1VWJDb4675r5Uina5Mle&:nonce=d1302425-6b61-4d93-a412-07c6d58af6a7&:time=1724108453&:session_length=3600&:external_user_id=1&:ua_Attr1=3&:theme=Dark&:mode=userbacked&:client_id=31c0d37dd9cffe984b412aa340509085deecce89940412a7118d1f60d992302c&:hide_folder_navigation=true&:menu_position=bottom&:email=gracesanford@protonmail.com&:account_type=embedUser&:hide_run_as_recipient=true&:external_user_team=Grace%20Test%20Team&:ua_Attr1=3&:signature=ff3c71fa1833cd93ecf81a8b13ccb8bf89726c5303a7144097a7f80d83ce0f33"; 

// 	// SEND URL TO CLIENT:
// 	response.status(200).send({url:EMBED_PATH});
// }

// //START EXPRESS SERVER LISTENING ON PORT 3001:
// app.listen(3000);

// SIGMA SERVER-SIDE EMBED API - SECURE QUICKSTART

// 1: Require necessary Node.js modules
const express = require('express');
const crypto = require('crypto');

// 2: Initialize an Express application
const app = express();

// 3: Manually set your configuration variables here (example values shown)
const EMBED_PATH = 'https://app.sigmacomputing.com/embed/4lzk9YKJO41vLKn2ZqXPb2';
const CLIENT_ID = '31c0d37dd9cffe984b412aa340509085deecce89940412a7118d1f60d992302c'
const EMBED_SECRET = '8089aa202308a6730aacf119a43e6e4bf5885a3b7f2b094776a9e43fbe7b3ed7f82fc6db1061f01642201cff418028b80693662a0240cf1709cf003bdd72e39f';
const PORT = 3000; // Feel free to change the port number as needed

// 4: Server Setup
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`); // Serve the main HTML file for the root path
});

// DEFINE A ROUTE HANDLER FOR GET REQUESTS TO GIVEN URL:
app.get('/api/generate_public_embed_url', generate_embed_url);

// CALL FUNCTION AND SET ANY PARAMETERS
function generate_embed_url(request, response) 
{
	// SET SIGMA EMBED URL VALUE:
	// THIS VALUE IS CALLED "PUBLIC LINK" IN SIGMA PORTAL:
	const EMBED_PATH = "https://app.sigmacomputing.com/embed/07VMTJdsq6PKIiubhHapP"; 

	// SEND URL TO CLIENT:
	response.status(200).send({url:EMBED_PATH});
}

// 5: Define a route handler for generating Sigma embed URLs
app.get('/api/generate-embed-url', (req, res) => {
    try {
        //Generate a unique nonce using crypto's UUID
        const nonce = crypto.randomUUID();
        let searchParams = `?:nonce=${nonce}`;

        // 6: Construct required search parameters
        searchParams += `&:client_id=${CLIENT_ID}`;
        searchParams += '&:email=gracesanford@protonmail.com';
        searchParams += '&:external_user_id=g1';
        searchParams += '&:external_user_team=Grace%20Test%20Team';
        searchParams += '&:account_type=Creator';
        searchParams += '&:mode=userbacked';
        searchParams += '&:session_length=600';
		searchParams += '&:ua_Attr1=600';
        searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;

        // 7: Construct the URL with search parameters and generate a signature
        const URL_WITH_SEARCH_PARAMS = EMBED_PATH + searchParams;
        const SIGNATURE = crypto
            .createHmac('sha256', Buffer.from(EMBED_SECRET, 'utf8'))
            .update(Buffer.from(URL_WITH_SEARCH_PARAMS, 'utf8'))
            .digest('hex');
        const URL_TO_SEND = `${URL_WITH_SEARCH_PARAMS}&:signature=${SIGNATURE}`;

        // 8: Send the final URL to the requester
        res.status(200).json({ url: URL_TO_SEND });
    } catch (error) {
        console.error('Error generating embed URL:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// 9: Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});