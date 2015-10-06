function init() {
  // Create variables for the various buttons
  var printButton = document.getElementById('print');
  var alertButton1 =  document.getElementById('alert1');
  var alertButton2 =  document.getElementById('alert2');
  var toggleButton = document.getElementById('toggle');

  // Add event listeners to the various buttons
  printButton.addEventListener('click', printButtonEventHandler);
  printButton.addEventListener('keydown', printButtonEventHandler);

  alertButton1.addEventListener('click', alertButtonEventHandler);
  alertButton1.addEventListener('keydown', alertButtonEventHandler);

  alertButton2.addEventListener('click', alertButtonEventHandler);

  toggleButton.addEventListener('click', toggleButtonEventHandler);
  toggleButton.addEventListener('keydown', toggleButtonEventHandler);
}

function printButtonEventHandler(event) {
  var type = event.type;

  // Grab the keydown and click events
  if (type === 'keydown') {
    // If either enter or space is pressed, execute the funtion
    if (event.keyCode === 13 || event.keyCode === 32) {
      window.print();

      event.preventDefault();
    }
  } else if (type === 'click') {
    window.print();
  }
}

function alertButtonEventHandler(event) {
  var type = event.type;
  var message = 'Hej, hello, ciao, こんにちは, 안녕';

  // Grab the keydown and click events
  if (type === 'keydown') {
    alert(event.keyCode)
    // If either enter or space is pressed, execute the funtion
    if (event.keyCode === 13 || event.keyCode === 32) {
      alert(message);

      event.preventDefault();
    }
  } else if (type === 'click') {
    alert(message);
  }
}

function toggleButtonEventHandler(event) {
  var type = event.type;

  // Grab the keydown and click events
  if (type === 'keydown') {
    // If either enter or space is pressed, execute the funtion
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleButtonState(event);

      event.preventDefault();
    }
  } else if (type === 'click') {
    toggleButtonState(event);
  }
}

function toggleButtonState(event) {
  var button = event.target;
  var currentState = button.getAttribute('aria-pressed');
  var newState = 'true';

  // If aria-pressed is set to true, set newState to false
  if (currentState === 'true') {
    newState = 'false';
  }

  // Set the new aria-pressed state on the button
  button.setAttribute('aria-pressed', newState);
}

window.onload = init;
