// Code to add textboxes
// ---------------------------------------------

function addText() {
  // Create a new div 
  var maincanvas= document.getElementById("maincanvas")
  var textbox = document.createElement('div')
  textbox.className = 'textbox';
  textbox.innerHTML = '<textarea id=text rows="1" cols="50" placeholder="Type Here..."></textarea>'
  // Add it to the main canvas
  maincanvas.appendChild(textbox);
  $(textbox).draggable({cursor: "crosshair"})

}

var textButton = document.getElementById('textbutton');
textButton.addEventListener('click', addText);

// Code to add questions
// ---------------------------------------------

function addQuestion() {
  // Create a new div 
  var maincanvas= document.getElementById("maincanvas")
  var questbox = document.createElement('div')
  questbox.className = 'questbox';
  questbox.innerHTML = '<textarea id=question rows="1" cols="50" placeholder="QUESTION"></textarea><br><textarea id=answer rows="6" cols="50" placeholder="Type Here..."></textarea>'
  // Add it to the main canvas
  maincanvas.appendChild(questbox);
  $(questbox).draggable({cursor: "crosshair"})

}

var questButton = document.getElementById('quest');
questButton.addEventListener('click', addQuestion);

// Code to add Arduino
// ---------------------------------------------

function addArduino() {
  // Create a new div 
  var maincanvas= document.getElementById("maincanvas")
  var arduino = document.createElement('div')
  arduino.className = 'arduinos';
  arduino.innerHTML = '<img src="assets/images/arduino.png" width=400px/>'
  // Add it to the main canvas
  maincanvas.appendChild(arduino);
  $(arduino).draggable({cursor: "crosshair"})

}

var arduinobutton = document.getElementById('arduino');
arduinobutton.addEventListener('click', addArduino);










///make elements draggable
$(document).ready(function(){
  //result is working
    $(".frame").draggable();
  //not working  
    $("#codeeditor").draggable();
    $(".p5editor").draggable();


});