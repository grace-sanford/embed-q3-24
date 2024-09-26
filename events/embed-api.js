// ---------- INBOUND start ------------- //

// SIGMA SERVER-SIDE EMBED API - Events Inbound

// 1: Require necessary Node.js modules
const express = require('express');
const crypto = require('crypto');

// 2: Initialize an Express application
const app = express();

// 3: Manually set your configuration variables here (example values shown)
const EMBED_PATH = 'YOUR_EMBED_PATH';
const EMBED_SECRET = 'YOUR_EMBED_SECRET';
const CLIENT_ID = 'YOUR_EMBED_CLIENTID';
const PORT = 3000; // Feel free to change the port number as needed

// 4: Server Setup
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`); // Serve the main HTML file for the root path
});

// 5: Define a route handler for generating Sigma embed URLs
app.get('/api/generate-embed-url', (req, res) => {
    try {
        // Generate a unique nonce using crypto's UUID
        const nonce = crypto.randomUUID();
        let searchParams = `?:nonce=${nonce}`;

        // 6: Construct required search parameters
        searchParams += `&:client_id=${CLIENT_ID}`;
        searchParams += '&:email=sales_manager1@sigmacomputing.com';
        searchParams += '&:external_user_id=sales_manager1@sigmacomputing.com';
        searchParams += '&:external_user_team=Sales_Managers';
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


// ---------- OUTBOUND start ---------- //

// SIGMA SERVER-SIDE EMBED API - Events Outbound

// // 1: Require necessary Node.js modules
// const express = require('express');
// const crypto = require('crypto');

// // 2: Initialize an Express application
// const app = express();

// // 3: Manually set your configuration variables here (example values shown)
// const EMBED_PATH = 'YOUR_EMBED_PATH';
// const EMBED_SECRET = 'YOUR_EMBED_SECRET';
// const CLIENT_ID = 'YOUR_EMBED_CLIENTID';
// const PORT = 3000; // Feel free to change the port number as needed

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
//         searchParams += '&:external_user_id=sales_manager1@sigmacomputing.com';
//         searchParams += '&:external_user_team=Sales_Managers';
//         searchParams += '&:account_type=Creator';
//         searchParams += '&:mode=userbacked';
//         searchParams += '&:session_length=600';
//         searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;
//         //APPEND WORKBOOK PAGE VARIABLES TO URL:
// 	        // SYNTAX FOR SINGLE VALUE:
// 		       // searchParams += `&${encodeURIComponent('StoreRegion')}=${encodeURIComponent('West')}`;
// 	        // SYNTAX FOR MULTIPLE VALUES:  
// 	  	          searchParams += `&${encodeURIComponent('StoreRegion')}=${encodeURIComponent('Southwest')},${encodeURIComponent('Midwest')}`;

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


// ---------- OUTBOUND end ---------- //


// --------------- SERVER-SIDE EMBED API start -------------- // 

// SIGMA SERVER-SIDE EMBED API - Events URL

// // 1: Require necessary Node.js modules
// const express = require('express');
// const crypto = require('crypto');

// // 2: Initialize an Express application
// const app = express();

// // 3: Manually set your configuration variables here (example values shown)
// const EMBED_PATH = 'YOUR_EMBED_PATH';
// const EMBED_SECRET = 'YOUR_EMBED_SECRET';
// const CLIENT_ID = 'YOUR_EMBED_CLIENTID';
// const PORT = 3000; // Feel free to change the port number as needed

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
//         searchParams += '&:external_user_id=sales_manager1@sigmacomputing.com';
//         searchParams += '&:external_user_team=Sales_Managers';
//         searchParams += '&:account_type=Creator';
//         searchParams += '&:mode=userbacked';
//         searchParams += '&:session_length=600';
//         searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;
//         //APPEND WORKBOOK PAGE VARIABLES TO URL:
// 	        // SYNTAX FOR SINGLE VALUE:
// 		        // searchParams += `&${encodeURIComponent('StoreRegion')}=${encodeURIComponent('West')}`;
// 	        // SYNTAX FOR MULTIPLE VALUES:  
// 	  	           searchParams += `&${encodeURIComponent('StoreRegion')}=${encodeURIComponent('Midwest')},${encodeURIComponent('Southwest')}`;

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

// --------------- SERVER-SIDE EMBED API end -------------- // 