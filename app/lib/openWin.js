exports.openWin = function(navGroup, winName) {
  var w = Alloy.createController(winName, navGroup).getView();
  if (Ti.Platform.osname === "android") {
    w.addEventListener("open", function(e) {
      if (!w.getActivity()) {
        Ti.API.error("Can't access action bar on a lightweight window.");
      } else {
        actionBar = w.activity.actionBar;
        if (actionBar) {
          actionBar.displayHomeAsUp = true;
          actionBar.onHomeIconItemSelected = function() {
            w.close();
          };
        }
        w.activity.invalidateOptionsMenu();
      }
    });
    w.open();
  } else {
    navGroup.openWindow(w, {
      animated: true
    });
  }
};