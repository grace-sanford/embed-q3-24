require('dotenv').config()

// ---------- INBOUND start ------------- //

// SIGMA SERVER-SIDE EMBED API - Events Inbound

// 1: Require necessary Node.js modules
const express = require('express');
const crypto = require('crypto');

// 2: Initialize an Express application
const app = express();

// 3: Manually set your configuration variables here (example values shown)
const EMBED_PATH = process.env.EMBED_EVENT_PATH;
const CLIENT_ID = process.env.CLIENT_ID;
const EMBED_SECRET = process.env.EMBED_SECRET;
const PORT = process.env.PORT; // Feel free to change the port number as needed

// 4: Server Setup
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index-inbound.html`); // Serve the main HTML file for the root path
});

// 5: Define a route handler for generating Sigma embed URLs
app.get('/api/generate-embed-url-inbound-event', (req, res) => {
    try {
        // Generate a unique nonce using crypto's UUID
        const nonce = crypto.randomUUID();
        let searchParams = `?:nonce=${nonce}`;

        // 6: Construct required search parameters
        searchParams += `&:client_id=${CLIENT_ID}`;
        searchParams += '&:email=gracesanford@protonmail.com';
        searchParams += '&:external_user_id=1';
        searchParams += '&:external_user_team=Grace%20Test%20Embed%20Team';
        searchParams += '&:account_type=Creator';
        searchParams += '&:mode=userbacked';
        searchParams += '&:session_length=600';
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


// ---------- INBOUND end ------------- //
