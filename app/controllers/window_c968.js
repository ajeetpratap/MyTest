if (Ti.Platform.osname != "android") {
  $.LoginScreen.navGroup = $.navigationGroup;
}
var config = require('config');

function SignUpLabel_click(e) {
  var _openWin = require("openWin");
  new _openWin.openWin($.LoginScreen.navGroup, "SignUpScreen");
};