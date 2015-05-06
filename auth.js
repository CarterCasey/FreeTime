/* global gapi - Comes from including apis.google.com/js/client.js */

// The following is pulled out of google's quickstart tutorial
// (developers.google.com/google-apps/calendar/quickstart/js)

// Used to authenticate API calls
var CLIENT_ID = '621464656172-sf6tg96hfh05cf2lm2rsbrfe8cglpucm.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true},
						handleAuthResult);
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false},
						handleAuthResult);
	return false;
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('auth-button');
    if (authResult && !authResult.error) {
		// Hide auth UI, then load Calendar client library.
		authorizeDiv.style.display = 'none';
		loadAPI();
	  } else {
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline';
	}
}

/**
* Load Google Calendar client library.
*/
function loadAPI() {
	gapi.client.load('calendar', 'v3', start);
}

