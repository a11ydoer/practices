var KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38
}

window.addEventListener('load', function() {

  var radiobuttons = document.querySelectorAll('[role=radio]');

  for(var i = 0; i < radiobuttons.length; i++ ) {
    var rb = radiobuttons[i];

    console.log(rb.tagName + " " + rb.id)

    rb.addEventListener('click', clickRadioGroup);
    rb.addEventListener('keydown', keyDownRadioGroup);
    rb.addEventListener('focus', focusRadioButton);
    rb.addEventListener('blur', blurRadioButton);
  }

});

/* 
* @function firstRadioButton
*/

function firstRadioButton(node) {
  
  var first = node.parentNode.firstChild;
  
  while(first) {
    if (first.nodeType === Node.ELEMENT_NODE) {
      if (first.getAttribute("role") === 'radio') return first;
    }
    first = first.nextSibling;
  }
  
  return null;
}

/* 
* @function lastRadioButton
*/

function lastRadioButton(node) {
  
  var last = node.parentNode.lastChild;

  while(last) {
    if (last.nodeType === Node.ELEMENT_NODE) {
      if (last.getAttribute("role") === 'radio') return last;
    }
    last = last.previousSibling;
  }

  console.log("gurg")
  return last;
}

/* 
* @function nextRadioButton
*/

function nextRadioButton(node) {
  
  var next = node.nextSibling;
  
  while(next) {
    if (next.nodeType === Node.ELEMENT_NODE) {
      if (next.getAttribute("role") === 'radio') return next;
    }
    next = next.nextSibling;
  }
  
  return null;
}

/* 
* @function previousRadioButton
*/

function previousRadioButton(node) {
  
  var prev = node.previousSibling;
  
  while(prev) {
    if (prev.nodeType === Node.ELEMENT_NODE) {
      if (prev.getAttribute("role") === 'radio') return prev;
    }
    prev = prev.previousSibling;
  }
  
  return null;
}

/* 
* @function getImage
*/

function getImage(node) {
  
  var child = node.firstChild;
  
  while(child) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.tagName === 'IMG') return child;
    }
    child = child.nextSibling;
  }
  
  return null;
}

/*
* @function setRadioButton
*
* @desc Toogles the state of a radio button
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function setRadioButton(node, state) {
  var image = getImage(node);

  if (state == 'true') {
    node.setAttribute('aria-checked', 'true')
    image.src = './images/radio-checked.gif';
    node.tabIndex = 0;
    node.focus()
  }
  else {
    node.setAttribute('aria-checked', 'false')
    image.src = './images/radio-unchecked.gif';   
    node.tabIndex = -1;
  }  
}

/*
* @function clickRadioGroup
*
* @desc 
*
* @param   {Object}   node  -  DOM node of updated group radio buttons
*/

function clickRadioGroup(event) {
  var type = event.type;
  
  if (type === 'click') {
    // If either enter or space is pressed, execute the funtion

    var node = event.currentTarget;

    var radioButton = firstRadioButton(node);

    while (radioButton) {
      setRadioButton(radioButton, "false");
      radioButton = nextRadioButton(radioButton);
    } 

    setRadioButton(node, "true");

    event.preventDefault();
    event.stopPropagation();
  }
}

/*
* @function clickRadioGroup
*
* @desc 
*
* @param   {Object}   node  -  DOM node of updated group radio buttons
*/

function keyDownRadioGroup(event) {
  var type = event.type;
  
  if (event.keyCode === KEYCODE.DOWN || event.keyCode === KEYCODE.RIGHT)
    var moveDown = true;
  else var moveDown = false;
  
  if (event.keyCode === KEYCODE.UP || event.keyCode === KEYCODE.LEFT)
    var moveUp = true;
  else var moveUp = false;
  
  
  if (type === 'keydown') {
    var next = null;
    // If any of the arrow keys are pressed, activate corresponding radio button.
    var node = event.currentTarget;

    if (moveDown){
      var next = nextRadioButton(node);
      if (!next) next = firstRadioButton(node); //if node is the last node, node cycles to first.
    }
    if (moveUp){
      next = previousRadioButton(node);
      if (!next) next = lastRadioButton(node); //if node is the last node, node cycles to first.
      
    }
    if (event.keyCode === KEYCODE.SPACE){
      
    }

    if (next) {
      var radioButton = firstRadioButton(node);

      while (radioButton) {
        setRadioButton(radioButton, "false");
        radioButton = nextRadioButton(radioButton);
      } 

      setRadioButton(next, "true");

      event.preventDefault();
      event.stopPropagation();
    }  
  }
  
  
}

/*
* @function focusRadioButton
*
* @desc Adds focus styling to label element encapsulating standard checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusRadioButton(event) {
  event.currentTarget.className += ' focus';
}

/*
* @function blurRadioButton
*
* @desc Adds focus styling to the label element encapsulating standard checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurRadioButton(event) {
  event.currentTarget.className = event.currentTarget.className.replace(' focus','');
}
