/* Custom Webservices */

var webservice = require('webService');
//facebook sdk initialization
var fb = Alloy.Globals.facebook;
//google module load
var googleAuth = Alloy.Globals.googleAuth;

var status = {};

/**
 * Facebook Login
 * @param {function} callback
 */
exports.facebookLogin = function(callback) {
	fb.addEventListener('login', function(e) {
		if (e.success) {
			Ti.API.info(JSON.stringify(e));
			status.statusCode = 0;
			status.statusMessage = JSON.stringify(e);
			callback(status);

		} else if (e.cancelled) {
			status.statusCode = 1;
			status.statusMessage = JSON.stringify(e);
			callback(status);
		} else {
			status.statusCode = 2;
			status.statusMessage = JSON.stringify(e);
			callback(status);
		}
	});

	fb.authorize();
};

/**
 * Google+ login
 * @param {function} callback
 */
exports.googleLogin = function(callback) {
	googleAuth.isAuthorized(function() {
		Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
		getGooglePlusUser(function(e) {
			callback(e);
		});
	}, function() {
		googleAuth.authorize(function() {
			getGooglePlusUser(function(e) {
				callback(e);
			});
		});

	});
};

/**
 * private function for used by googleLogin to get the user profile information
 * @param {function} callback
 */
function getGooglePlusUser(callback) {
	var xhrList = Ti.Network.createHTTPClient({
		onload : function(e) {
			var resp = JSON.parse(this.responseText);
			status.statusCode = 0;
			status.statusMessage = JSON.stringify(resp);
			callback(status);
		},
		onerror : function(e) {
			status.statusCode = 1;
			status.statusMessage = JSON.stringify(e);
			callback(status);
		},
		timeout : 5000
	});
	xhrList.open("GET", 'https://www.googleapis.com/plus/v1/people/me?access_token=' + googleAuth.getAccessToken());
	xhrList.send();
};
