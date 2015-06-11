if (Ti.Platform.osname != "android") {
  $.LoginScreen.navGroup = $.navigationGroup;
}
var config = require('config');
var service = require('customWebservice');
function SignUp(e) {
  var _openWin = require("openWin");
  new _openWin.openWin($.LoginScreen.navGroup, "SignUpScreen");
};

/**
 *
 * Facebook button login
 */
function fbLogin() {
	service.facebookLogin(function(e) {
		if (e.statusCode == 0) {
			Ti.API.info('fb response ' + e.statusMessage);
			//TODO: Save the facebook response somewhere to use it later
			if (OS_IOS) {
				//$.SignUpScreen.navGroup.closeWindow($.SignUpScreen);
			} else {
				//$.SignUpScreen.close();
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
			Ti.API.info('google response ' + e.statusMessage);
			if (OS_IOS) {
				//$.SignUpScreen.navGroup.closeWindow($.SignUpScreen);
			} else {
				//$.SignUpScreen.close();
			}
		} else {
			alert('Something went wrong,tyr again');
		}
	});
}

