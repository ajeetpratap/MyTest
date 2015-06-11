var config = require('config');
var service = require('customWebservice');
var args = arguments[0] || {};
if (Ti.Platform.osname != "android") {
	$.SignUpScreen.navGroup = args;
}

/**
 *
 * Facebook button login
 */
function fbLogin() {
	service.facebookLogin(function(e) {
		if (e.statusCode == 0) {
			Ti.API.info('google response ' + e.statusMessage);
			//TODO: Save the facebook response somewhere to use it later
			if (OS_IOS) {
				$.SignUpScreen.navGroup.closeWindow($.SignUpScreen);
			} else {
				$.SignUpScreen.close();
			}

		} else if (e.statusCode == 1) {
			//user cancelled

		} else {
			alert('Something went worng, try again');
		}

	});

}

/**
 * Google+ Login
 */
function gLogin() {
	service.googleLogin(function(e) {
		if (e.statusCode == 0) {
			//TODO: save the google+response for later use
			Ti.API.info('fb response ' + e.statusMessage);
			if (OS_IOS) {
				$.SignUpScreen.navGroup.closeWindow($.SignUpScreen);
			} else {
				$.SignUpScreen.close();
			}
		} else {
			alert('Something went wrong,tyr again');
		}
	});
}

