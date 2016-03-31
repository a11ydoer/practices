var KEYCODE = {
    DOWN: 40,
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
}

window.addEventListener('load', function() {

  var menuButtons = document.querySelectorAll('button[aria-haspopup=true]');

  for(var i = 0; i < menuButtons.length; i++ ) {
    var mb = menuButtons[i];

    console.log(mb.tagName + " " + mb.id)

    mb.addEventListener('keydown', keyDownMenuButton);
    mb.addEventListener('mouseover', mouseOverMenuButton);
    mb.addEventListener('mouseout', mouseOutMenuButton);
  }

  var menuItems = document.querySelectorAll('[role=menuitem]');

  for(var i = 0; i < menuItems.length; i++ ) {
    var mi = menuItems[i];

    console.log(mi.tagName + " " + mi.id)

    mi.addEventListener('keydown', keyDownMenuItem);
    mi.addEventListener('focus', focusMenuItem);
    mi.addEventListener('blur', blurMenuItem);
    mi.addEventListener('mouseover', mouseOverMenuItem);
    mi.addEventListener('mouseout', mouseOutMenuItem);
  }

});

var mouseInMenuItem = false;
var mouseInMenuButton = false;

function showMenu(menu) {
    menu.style.display = 'block';
}

function hideMenu(menu) {
  if(!mouseInMenuItem && !mouseInMenuButton) menu.style.display = 'none';
}

function toggleMenu(menu) {
    if (menu.style.display == 'block') menu.style.display = 'none';
    else menu.style.display = 'block';
}

/* 
* @function firstMenuItem
*
* @desc Returns the first radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function firstMenuItem(node) {
  
  var first = node.parentNode.firstChild;
  
  while(first) {
    if (first.nodeType === Node.ELEMENT_NODE) {
      if (first.getAttribute("role") === 'menuitem') return first;
    }
    first = first.nextSibling;
  }
  
  return null;
}

/* 
* @function lastMenuItem
*
* @desc Returns the last radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function lastMenuItem(node) {
  
  var last = node.parentNode.lastChild;

  while(last) {
    if (last.nodeType === Node.ELEMENT_NODE) {
      if (last.getAttribute("role") === 'menuitem') return last;
    }
    last = last.previousSibling;
  }
  
  return last;
}

/* 
* @function nextMenuItem
*
* @desc Returns the next radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function nextMenuItem(node) {
  
  var next = node.nextSibling;
  
  while(next) {
    if (next.nodeType === Node.ELEMENT_NODE) {
      if (next.getAttribute("role") === 'menuitem') return next;
    }
    next = next.nextSibling
  }
  
  return null;
}

/* 
* @function previousMenuItem
*
* @desc Returns the previous radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function previousMenuItem(node) {
  
  var prev = node.previousSibling;
  
  while(prev) {
    if (prev.nodeType === Node.ELEMENT_NODE) {
      if (prev.getAttribute("role") === 'menuitem') return prev;
    }
    prev = prev.previousSibling;
  }
  
  return null;
}



function keyDownMenuButton(event) {
  var mi;

  if ((event.keyCode === KEYCODE.UP) ||
      (event.keyCode === KEYCODE.DOWN)) {
    var mb = event.currentTarget;

    var menuRef = mb.getAttribute('aria-controls')

    if (menuRef) {
      var menu = document.getElementById(menuRef);

      if (menu) {
        if (event.keyCode === KEYCODE.DOWN) {
          mi = firstMenuItem(menu.firstChild);
        }
        else {
          mi = lastMenuItem(menu.firstChild);
        }
        mi.focus()
      }
    }  

    event.stopPropagation();
    event.preventDefault()
  }

  if ((event.keyCode === KEYCODE.SPACE) ||
      (event.keyCode === KEYCODE.ENTER)) {
    var mb = event.currentTarget;

    var menuRef = mb.getAttribute('aria-controls')

    if (menuRef) {
      var menu = document.getElementById(menuRef);
      toggleMenu(menu);
    }  

    event.stopPropagation();
    event.preventDefault()
  }


 if (event.keyCode === KEYCODE.TAB) {
    var mb = event.currentTarget;

    var menuRef = mb.getAttribute('aria-controls')

    if (menuRef) {
      var menu = document.getElementById(menuRef);

      if (menu) menu.style.display = 'none';
    }   
  }

}

function mouseOverMenuButton(event) {
    var mb = event.currentTarget;
    mouseInMenuButton = true;

    var menuRef = mb.getAttribute('aria-controls')

    if (menuRef) {
      var menu = document.getElementById(menuRef);
      if (menu) showMenu(menu);
    }  
}

function mouseOutMenuButton(event) {
    var mb = event.currentTarget;
    mouseInMenuButton = false;

    var menuRef = mb.getAttribute('aria-controls')

    if (menuRef) {
      var menu = document.getElementById(menuRef);
      if (menu) setTimeout(function() { hideMenu(menu);}, 1000);
    }  
}

/*
* @function setMenuItem
*
* @desc Toogles the state of a radio button
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function setMenuItem(node, state) {
  if (state == 'true') {
    node.focus()
  }
  else {
  }  
}

/*
* @function keyDownMenuItem
*
* @desc 
*
* @param   {Object}   node  -  DOM node of updated group radio buttons
*/

function keyDownMenuItem(event) {
  var type = event.type;
  var next = false;
  
  if(type === "keydown"){
    var node = event.currentTarget;
  
    switch (event.keyCode) {
      case KEYCODE.DOWN:
      case KEYCODE.RIGHT:
        var next = nextMenuItem(node);
        if (!next) next = firstMenuItem(node); //if node is the last node, node cycles to first.
        break;

      case KEYCODE.UP:
      case KEYCODE.LEFT:
        next = previousMenuItem(node);
        if (!next) next = lastMenuItem(node); //if node is the last node, node cycles to first.
        break;
        
      case KEYCODE.SPACE:
        next = node;
        break;

      case KEYCODE.TAB:
        node.parentElement.style.display = 'none';

        return;
        break;

    }
    
    if (next) {
      var MenuItem = firstMenuItem(node);

      while (MenuItem) {
        setMenuItem(MenuItem, "false");
        MenuItem = nextMenuItem(MenuItem);
      } 
      
      setMenuItem(next, "true");

      event.preventDefault();
      event.stopPropagation();
    }
  }  
}

/*
* @function focusMenuItem
*
* @desc Adds focus styling to label element encapsulating standard radio button
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusMenuItem(event) {
  event.currentTarget.className += ' focus';
}

/*
* @function blurMenuItem
*
* @desc Remove focus styling to the label element encapsulating standard radio button
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurMenuItem(event) {
   event.currentTarget.className = event.currentTarget.className.replace(' focus','');
}


function mouseOverMenuItem(event) {
  mouseInMenuItem = true;
}


function mouseOutMenuItem(event) {
  mouseInMenuItem = false;
  var menu = event.currentTarget.parentElement;
  if (menu)  setTimeout(function() { hideMenu(menu);}, 1000);
}


