var KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38
}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function menuFunction() {
    document.getElementById("menuDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function setMenuItem(node, state) {

  if (state == 'true') {
    node.setAttribute('aria-checked', 'true')
    node.tabIndex = 0;
    node.focus()
  }
  else {
    node.setAttribute('aria-checked', 'false')
    node.tabIndex = -1;
  }  
}
/*
* @function keyDownMenuItem
*
* @desc 
*
* @param   {Object}   node  -  DOM node of updated menu item
*/

function keyDownMenuGroup(event) {
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
    }
    
    if (next) {
      var menuItem= firstMenuItem(node);

      while (menuItem) {
        setMenuItem(menuItem, "false");
        menuItem = nextMenuItem(menuItem);
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
* @desc Adds focus styling to label element encapsulating standard menu item
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusMenuItem(event) {
  event.currentTarget.className += ' focus';
}

/*
* @function blurMenuItem
*
* @desc Adds focus styling to the label element encapsulating standard menu item
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurMenuItem(event) {
   event.currentTarget.className = event.currentTarget.className.replace(' focus','');
}