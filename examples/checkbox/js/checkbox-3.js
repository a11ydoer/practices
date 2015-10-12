/*
* @function toggleGroupCheckBox
*
* @desc Toogles the state of a grouping checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function toggleGroupCheckbox(event) {
  var node = event.currentTarget

  var image = node.getElementsByTagName('img')[0]

  var state = node.getAttribute('aria-checked').toLowerCase()

  if (event.type === 'click' || 
      (event.type === 'keydown' && event.keyCode === 32)) {

          if (state === 'false' || state === 'mixed') {
            node.setAttribute('aria-checked', 'true')
            image.src = './images/checkbox-checked-black.png'
            setCheckboxes(node, 'true')
          }
          else {
            node.setAttribute('aria-checked', 'false')
            image.src = './images/checkbox-unchecked-black.png'
            setCheckboxes(node, 'false')
          }  

    event.preventDefault()
    event.stopPropagation()

   } 

}

/*
* @function toggleCheckBox
*
* @desc Togles the state of a groupbox and checkboxes and updates the image indicating state based on aria-checked values
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function toggleCheckbox(event) {
  var node = event.currentTarget

  var image = node.getElementsByTagName('img')[0]

  var state = node.getAttribute('aria-checked').toLowerCase()

  if (event.type === 'click' || 
      (event.type === 'keydown' && event.keyCode === 32)) {
          if (state === 'true') {
            node.setAttribute('aria-checked', 'false')
            image.src = './images/checkbox-unchecked-black.png'
          }
          else {
            node.setAttribute('aria-checked', 'true')
            image.src = './images/checkbox-checked-black.png'
          }  

    updateGroupCheckbox(node)
    event.preventDefault()
    event.stopPropagation()
  }

}

/*
* @function setCheckboxes
*
* @desc 
*
* @param   {Object}      node  -  DOM node of updated checkbox
* @param   {Booleam}  state  -  Set value of checkboxes
*
*/

function setCheckboxes(node, state) {

  var checkboxes = node.parentNode.getElementsByClassName('checkbox')

  for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i]

    var image = cb.getElementsByTagName('img')[0]
    cb.setAttribute('aria-checked', state)

    if (state === 'false') {
       image.src = './images/checkbox-unchecked-black.png'
    }
   else {
     image.src = './images/checkbox-checked-black.png'
    }  
  } 
}

/*
* @function updateGroupCheckbox
*
* @desc 
*
* @param   {Object}   node  -  DOM node of updated group checkbox
*/
function updateGroupCheckbox(node) {

  var checkboxes = node.parentNode.getElementsByClassName('checkbox')

  var state = 'false';
  var count = 0;

  for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i]

    if (cb.getAttribute('aria-checked') === 'true') count += 1
  } 

  if (count > 0) state = 'mixed'
  if (count === checkboxes.length) state = 'true'  

  var group_checkbox = node.parentNode.getElementsByClassName('group_checkbox')[0]   
  var image = group_checkbox.getElementsByTagName('img')[0]

  group_checkbox.setAttribute('aria-checked', state)

  if (state === 'false') image.src = './images/checkbox-unchecked-black.png'
  else if (state === 'true') image.src = './images/checkbox-checked-black.png'
  else image.src = './images/checkbox-mixed-black.png'

}
/*
* @function focusCheckBox
*
* @desc Adds focus to the class name of the checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusCheckbox(event) {
  event.currentTarget.className += ' focus'
}

/*
* @function blurCheckBox
*
* @desc Adds focus to the class name of the checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurCheckbox(event) {
  event.currentTarget.className = event.currentTarget.className .replace(' focus','')
}

