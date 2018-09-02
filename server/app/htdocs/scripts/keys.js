'use strict';

// Cancel
$(window).bind('keydown', function (event) {
  if (event.keyCode == 116) {
    return false;
  } else if (event.ctrlKey || event.metaKey) {
    switch (String.fromCharCode(event.which).toLowerCase()) {
      case 's':
        return false;
        break;
      case 'f':
        return false;
        break;
      case 'g':
        return false;
        break;
      case 'u':
        return false;
        break;
      case 'w':
        return false;
        break;
    }
  }
});

// Actions
$(window).bind('keydown', function (event) {
  if (event.keyCode == 116) {
    reloadExplorer();
  } else if (event.ctrlKey || event.metaKey) {
    switch (String.fromCharCode(event.which).toLowerCase()) {
      case 's':
        editor.save();
        break;
      case 'f':
        break;
      case 'g':
        break;
      case 'u':
        break;
      case 'w':
        break;
    }
  }
});