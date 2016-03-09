/*
 * Copyright 2011-2014 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/*
 * ARIA Menu Bar example
 * @function onload
 * @desc 
 */



/** 
 * @namespace aria
 */

  var aria = aria || {};

/* ---------------------------------------------------------------- */
/*                  ARIA Utils Namespace                        */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor Menu
 *
 * @memberOf aria.Utils

 * @desc  Computes absolute position of an element
 *
 * @param  element    DOM node  -  DOM node object
 *
 * @retruns  Object  Object contains left and top position
 */

aria.Utils = aria.Utils || {};

aria.Utils.findPos = function(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
};


/* ---------------------------------------------------------------- */
/*                  ARIA Widget Namespace                        */ 
/* ---------------------------------------------------------------- */

aria.widget = aria.widget || {};






window.addEventListener('load', function() {

  var menuBars= document.querySelectorAll('ul.menubar');
    [].forEach.call(menuBars, function(Menu){
    if (Menu){
      var mb = new aria.widget.MenuBar(Menu)
     console.log(mb);
     mb.initMenuBar();
    } 
  });
});


aria.widget.MenuBar = function(node) {

   this.keyCode = Object.freeze({
     "TAB"      : 9,
     "RETURN"   : 13,
     "ESC"    : 27,
     "SPACE"    : 32,
     "PAGEUP"    : 33,
     "PAGEDOWN" : 34,
     "END"      : 35,
     "HOME"     : 36,
     "LEFT"  : 37,
     "UP"    : 38,
     "RIGHT" : 39,
     "DOWN"  : 40
     });

    this.menuNode = node;
   };

   aria.widget.MenuBar.prototype.initMenuBar = function() {

    var menubar= this;

    var cn = this.menuNode.firstChild;

    while (cn) {
      if (cn.nodeType === Node.ELEMENT_NODE) {
        if (cn.getAttribute('role')  === 'menuitem') {
          cn.tabIndex = -1;
          if (!this.firstMenuItem) this.firstMenuItem = cn; 
          this.lastMenuItem = cn;

          var eventKeyDown = function (event) {
            menubar.eventKeyDown(event, menubar);
          };
          cn.addEventListener('keydown', eventKeyDown);
        }
      }
      cn = cn.nextSibling;
    }
      this.firstMenuItem.tabIndex = 0;

};






aria.widget.MenuBar.prototype.eventKeyDown = function(event, menubar) {

  var ct = event.currentTarget;
  var flag = false;

  switch(event.keyCode) {

  case menubar.keyCode.UP:
  case menubar.keyCode.LEFT:
    menubar.previousMenuItem(ct);
    flag = true;
    break;

  case menubar.keyCode.DOWN:
  case menubar.keyCode.RIGHT:
    menubar.nextMenuItem(ct);
    flag = true;
    break;

  case menubar.keyCode.RETURN:
   menubar.openMenu(ct);

  default:
    break;
  }

  
  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }  
  
};

aria.widget.MenuBar.prototype.previousMenuItem = function(currentMenuItem) {

  var mi = currentMenuItem.previousSibling;

  while (mi) {
    if (mi.nodeType === Node.ELEMENT_NODE && mi.getAttribute('role')  === 'menuitem') {
      mi.focus();
      break;
    }
    mi = mi.previousSibling;
  }

  if (!mi && this.lastMenuItem) {
    this.lastMenuItem.focus();
  }
};
aria.widget.MenuBar.prototype.nextMenuItem = function(currentMenuItem) {

  var mi = currentMenuItem.nextSibling;


  while (mi) {
    if ((mi.nodeType === Node.ELEMENT_NODE) && 
      (mi.getAttribute('role')  === 'menuitem')) {
      mi.focus();
      break;
    }
    mi = mi.nextSibling;
  }

  if (!mi && this.firstMenuItem) {
    this.firstMenuItem.focus();
  }
};

/**
 * @method openMenu
 *
 * @memberOf aria.widget.MenuButton
 *
 * @desc  Opens the menu
 */

aria.widget.MenuBar.prototype.openMenu = function(whichmenu) {

  if (whichmenu) {
    var pos = aria.Utils.findPos(whichmenu);
    var br = whichmenu.getBoundingClientRect();

    whichmenu.style.display = 'block';
    whichmenu.style.position = 'absolute';
    whichmenu.style.top  = (pos.y + br.height) + "px"; 
    whichmenu.style.left = pos.x + "px"; ;
  }  
};

/**
 * @method closeMenu
 *
 * @memberOf aria.widget.MenuButton
 *
 * @desc  Close the menu
 */



