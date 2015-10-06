/*
* @function toggleCheckBox
*
* @desc Togles the state of a groupbox and checkboxes and updates the image indicating state based on aria-checked values
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function toggleCheckbox(event) {
  node = event.currentTarget
  toggleCheckboxImpl(node)  
  
  groupBoxState= document.getElementById('cb1all').getAttribute('aria-checked').toLowerCase()
  checkboxList = document.querySelectorAll('div.checkbox')

  mixed = false
  for(var i=0, n=checkboxList.length;  i< n; i++) {
    if (checkboxList[i].getAttribute('aria-checked').toLowerCase() == 'true') {
        mixed = true
      }
    }

  if(mixed) {
    document.getElementById('cb1all').setAttribute('aria-checked', 'mixed')
    document.getElementById('cb1all').firstElementChild.src = './images/checkbox-mixed-black.png' 
 
  } 
  else {
    document.getElementById('cb1all').setAttribute('aria-checked', 'false')  
  }
}

/*
* @function toggleCheckboxImpl
*
* @desc Togles the state of checkboxes and updates image indicating state based on aria-checked values
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function toggleCheckboxImpl(node) {
  
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

    event.preventDefault()
    event.stopPropagation()
  }
}

/*
* @function groupCheckbox
*
* @desc Check the checkbox state to control state and image of group checkbox.
*
* @param   {Object}  event  -  Standard W3C event object
*/
function groupCheckbox(event) {

  node = event.currentTarget
  toggleCheckboxImpl(node)  
  
  var checkboxList = document.querySelectorAll('div.checkbox')
  var groupboxState  = event.currentTarget. getAttribute('aria-checked').toLowerCase()
  for(var i=0, n=checkboxList.length;  i< n; i++) { 
    checkboxStatus = checkboxList[i].getAttribute('aria-checked').toLowerCase()
    if(checkboxStatus != groupboxState) {
      toggleCheckboxImpl(checkboxList[i]) 
    }
  }
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

