var config = require('config');
var args = arguments[0] || {};
if (Ti.Platform.osname != "android") {
  $.SignUpScreen.navGroup = args;
}

//facebook sdk initialization
var fb = Alloy.Globals.facebook;

//google module load
var googleAuth = Alloy.Globals.googleAuth;

/**
 * 
 * Facebook button login
 */
function fbLogin() {
	fb.addEventListener('login', function(e) {
    if (e.success) {
        Ti.API.info(JSON.stringify(e));
        if(IOS)
        {
        	$.SignUpScreen.navGroup.closeWindow($.SignUpScreen);
        }
        else
        {
        	$.SignUpScreen.close();
        }
    }
    else if (e.cancelled) {
        // user cancelled
        alert('cancelled');
    }
    else {
        alert(e.error);
    }
});

fb.authorize();
}

/*
 * 
 * Google+ auth login
 */

function gLogin() {
	
	googleAuth.isAuthorized(function(){
		Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
		getGooglePlusUser(function(e){
			Ti.API.info('user object is '+e);
			alert(e);
		});
	},function(){
		googleAuth.authorize();
		getGooglePlusUser(function(e){
			Ti.API.info('user object is '+e);
			alert(e);
		});
	});	
}


function getGooglePlusUser(callback){
	var xhrList = Ti.Network.createHTTPClient({
			onload : function(e) {
				var resp = JSON.parse(this.responseText);
				callback(JSON.stringify(resp));
			},
			onerror: function(e) {
				callback(JSON.stringify(e));
			},
			timeout : 5000
		});
		xhrList.open("GET", 'https://www.googleapis.com/plus/v1/people/me?access_token=' + googleAuth.getAccessToken());
		xhrList.send();
};
