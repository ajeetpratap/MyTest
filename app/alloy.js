// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//////////////////////////////////////////////////////////////
/////// Control Singleton
/////////////////////////////////////////////////////////////
/*
* This will help us to get the properties of the control based in the device size type
*
*
*/
Alloy.Globals.Control = {
	textField : {
		height : (Ti.Platform.displayCaps.platformHeight < 481) ? 32 : 40,
		hintTextColor : '#fcebd3',
		color : '#000000'
	},
	button : {
		height : (Ti.Platform.displayCaps.platformHeight < 481) ? 32 : 40,

	}
};

//facebook sdk initialization
Alloy.Globals.facebook = require('facebook');
Alloy.Globals.facebook.permissions = ['public_profile', 'email', 'user_birthday'];

//Google+ module initialisation
Alloy.Globals.GoogleAuth_module = require('googleAuth');
Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
	clientId : '60592484587-dmpsf4j9l7jctev6dg2smnlk41dhgldm.apps.googleusercontent.com',
	clientSecret : 'EjOU1Oe2sCnSSVmaBbeWe0QW',
	propertyName : 'googleToken',
	quiet : false,
	scope : ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}); 