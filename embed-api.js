// SIGMA SERVER-SIDE EMBED API - SECURE QUICKSTART
//https://quickstarts.sigmacomputing.com/guide/embedding_03_secure_access/index.html?index=..%2F..index#0

// Require dotenv to bring in your env variables
require('dotenv').config()
// Require necessary Node.js modules
const express = require('express');
const crypto = require('crypto');

// Initialize an Express application
const app = express();

// Manually set your configuration variables here (example values shown)
const EMBED_PATH = process.env.EMBED_PATH;
const CLIENT_ID = process.env.CLIENT_ID;
const EMBED_SECRET = process.env.EMBED_SECRET;
const PORT = process.env.PORT; 

// Server Setup
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

// Define a route handler for generating Sigma embed URLs
app.get('/api/generate-embed-url', (req, res) => {
    try { 
        //Generate a unique nonce using crypto's UUID
        const nonce = crypto.randomUUID();
        let searchParams = `?:nonce=${nonce}`;

        // Construct required search parameters
        searchParams += `&:client_id=${CLIENT_ID}`;
        searchParams += '&:email=gracesanford@protonmail.com';
		// Try un-commenting this email to see what it looks like when an internal user tries to access a secure embed
		// searchParams += '&:email=grace.sanford+9@sigmacomputing.com';
        searchParams += '&:external_user_id=1';

		// For encoding special characters see: https://help.sigmacomputing.com/docs/special-characters-for-url-parameters
        searchParams += '&:external_user_team=Grace%20Test%20Embed%20Team';
        searchParams += '&:account_type=Creator';
        searchParams += '&:mode=userbacked';
		searchParams += '&Id-CONTROL=1';
		searchParams += '&Store-Region-control=East';
        searchParams += '&:session_length=600';
		searchParams += '&:ua_Grace-Test-User-Attribute=This%20is%20the%20value%20of%20the%20user%20attribute%20Grace-Test-User-Attribute%20passed%20in%20the%20embed%20URL.%20UA%20values%20noramlly%20are%27t%20this%20long.%20Call%20it%20in%20the%20Sigma%20Workbook%20with%20CurrentUserAttributeText%28%22Grace-Test-User-Attribute%22%29';
		searchParams += '&:ua_GS_DRS_REGION=ENGINEERING%20-%20APPS';
        searchParams += `&:time=${Math.floor(new Date().getTime() / 1000)}`;
		//-- Additional parameters start --//
		//SET A VALUE FOR disable_mobile_view. Default=no.
		searchParams += '&:disable_mobile_view=yes';
		//SET A VALUE FOR language. Default=en List of supported languages: https://help.sigmacomputing.com/docs/manage-workbook-localization#supported-languages-and-locales
		//searchParams += '&:lng=fa-ca';
		//SET A VALUE FOR first_name. Default=Embed.
		// searchParams += '&:first_name=Bob';
		//SET A VALUE FOR hide_folder_navigation. Default=false.
		searchParams += '&:hide_folder_navigation=false';
		//HIDE THE MENU IN BOTTOM-LEFT CORNER FROM EMBED USERS. DEFAULT=false
		searchParams += '&:hide_menu=false';
		//HIDE THE "SCHEDULE NOW" OPTION IN THE BOTTOM-LEFT CORNER FROM EMBED USERS. DEFAULT=false
		//searchParams += '&:hide_schedule=false';
		//HIDE THE "SEND NOW" OPTION IN THE BOTTOM-LEFT CORNER FROM EMBED USERS. DEFAULT=false
		searchParams += '&:hide_send=true';
		//HIDE SHEET INTERACTIONS OPTION FROM EMBED USERS. DEFAULT=false
		searchParams += '&:hide_sheet_interactions=false';
		//SET A VALUE FOR hide_tooltip. Default=false.
		searchParams += '&:hide_tooltip=true';
		//SET A VALUE FOR hide_workbook_name. Default=false.
		searchParams += '&:hide_workbook_name=true';
		//SET A VALUE FOR last_name. Default=User.
		// searchParams += '&:last_name=Smith';
		//SET A COLOR FOR THE BACKGROUND ON LOADING AND ERROR SCREENS
		searchParams += '&:loading_bg=FF0000';
		//SET A COLOR FOR THE FONT ON LOADING AND ERROR SCREENS 
		searchParams += '&:loading_text=FFFFFF';
		//SET THE POSITION OF THE TOOLBAR. DEFAULT = "bottom".
		// searchParams += '&:menu_position=top';
		//ENABLE JAVASCRIPT EVENT FOR responsive_height. DEFAULT = "false".
		searchParams += '&:responsive_height=true';
		//SHOW FOOTER ON PAGE OR NOT. DEFAULT = "true".
		searchParams += '&:show_footer=true';
		//CHANGE THEME SIGMA WILL USE FOR THE EMBED. DEFAULT = "Light".
		searchParams += '&:theme=Dark';
		searchParams += '&:ua_Region=West';
		//Sets the workbook creator's name (instead of email) in embed menus and system-generated emails. DEFAULT=
		// searchParams += '&:use_user_name=Bob Smith';
		//PASSES A SECURE TOKEN TO SIGMA THAT AUTHENTICATES CONNECTIONS USING OAUTH
		// searchParams += '&:oauth_token={token}';

		//-- Additional parameters end --//
		

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
