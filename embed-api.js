// SIGMA SERVER-SIDE EMBED API - SECURE QUICKSTART
require('dotenv').config()
// 1: Require necessary Node.js modules
const express = require('express');
const crypto = require('crypto');

// 2: Initialize an Express application
const app = express();

// 3: Manually set your configuration variables here (example values shown)
//TODO: mask these
const EMBED_PATH = process.env.EMBED_PATH;
const CLIENT_ID = process.env.CLIENT_ID;
const EMBED_SECRET = process.env.EMBED_SECRET;
const PORT = process.env.PORT; // Feel free to change the port number as needed

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
        searchParams += '&:external_user_team=Grace%20Test%20Embed%20Team';
        searchParams += '&:account_type=Creator';
        searchParams += '&:mode=userbacked';
        searchParams += '&:session_length=600';
		searchParams += '&:ua_grace-edit-attr-test=value';
        searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;
		// searchParams += `&Roman-Numeral-CONTROL=I`;

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


//Outbound events

// SIGMA SERVER-SIDE EMBED API - Events Outbound

// // 1: Require necessary Node.js modules
// const express = require('express');
// const crypto = require('crypto');

// // 2: Initialize an Express application
// const app = express();

// // // 3: Manually set your configuration variables here (example values shown)
// // //TODO: mask these
// const EMBED_PATH = process.env.EMBED_PATH;
// const CLIENT_ID = process.env.CLIENT_ID;
// const EMBED_SECRET = process.env.EMBED_SECRET;
// const PORT = process.env.PORT; // Feel free to change the port number as needed

// // 4: Server Setup
// app.get('/', (req, res) => {
//     res.sendFile(`${__dirname}/index.html`); // Serve the main HTML file for the root path
// });

// // 5: Define a route handler for generating Sigma embed URLs
// app.get('/api/generate-embed-url', (req, res) => {
//     try {
//         // Generate a unique nonce using crypto's UUID
//         const nonce = crypto.randomUUID();
//         let searchParams = `?:nonce=${nonce}`;

//         // 6: Construct required search parameters
//         searchParams += `&:client_id=${CLIENT_ID}`;
//         searchParams += '&:email=sales_manager1@sigmacomputing.com';
//         searchParams += '&:external_user_id=gracesanford@protonmail.com';
//         searchParams += '&:external_user_team=Grace%20Test%20Embed%20Team';
//         searchParams += '&:account_type=Creator';
//         searchParams += '&:mode=userbacked';
//         searchParams += '&:session_length=600';
//         searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;
//         searchParams += `&${encodeURIComponent('Roman-Numeral-CONTROL')}=${encodeURIComponent('I')},${encodeURIComponent('II')}`;

//         // 7: Construct the URL with search parameters and generate a signature
//         const URL_WITH_SEARCH_PARAMS = EMBED_PATH + searchParams;
//         const SIGNATURE = crypto
//             .createHmac('sha256', Buffer.from(EMBED_SECRET, 'utf8'))
//             .update(Buffer.from(URL_WITH_SEARCH_PARAMS, 'utf8'))
//             .digest('hex');
//         const URL_TO_SEND = `${URL_WITH_SEARCH_PARAMS}&:signature=${SIGNATURE}`;

//         // 8: Send the final URL to the requester
//         res.status(200).json({ url: URL_TO_SEND });
//     } catch (error) {
//         console.error('Error generating embed URL:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // 9: Start the server
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });
