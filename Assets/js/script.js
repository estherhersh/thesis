var code
var data_url
var textarea = document.getElementById("codeeditor")
var codeeditor = CodeMirror.fromTextArea(textarea, {
  mode:  "javascript",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  theme : 'solarized',
  extraKeys: {
    "Tab": "indentMore"
  }
});

$( "#codeeditor").change(submit_code());



function myFunction(){
  console.log("change!")
}
function submit_code()
{
    // codeeditor.save();
    var cdn = "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.min.js'></script><script>"
    var endcdn="</script></body></html>"
    code = cdn + codeeditor.getValue() + endcdn;
    // console.log(code);
  
    data_url = "data:text/html;charset=utf-8;base64," + $.base64.encode(code);
    document.getElementById("result").src = data_url;

}

 codeeditor.on('change', function(e) {
    setTimeout(submit_code, 5000);
});

///make elements draggable
$(document).ready(function(){
  //result is working
    $("#result").draggable();
  //not working  
    $("#codeeditor").draggable();


});

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



// Code to handle versions
// ---------------------------------------------

var counter = 1;

function createVersion(id) {
  // Create a new div DOM element
  var version = document.createElement('div')
  version.className = 'version';
  // var userInput = version.value;
  //version.innerHTML = ' <input id="'+id+'" placeholder="Version' + counter + '" rows= 1>' ;
  version.innerHTML = ' <a id="'+id+'" href="#">Version' +counter+ '</a>' ;
  // console.log(userInput)

  // Add it to the #versions column 
  versionsCol.appendChild(version);
  $(version).draggable({ containment: "parent"})

  $(version).find('a').click(function(e) {
    var id = $(this).attr('id');
    console.log('I clicked ' + id)

    // make a get request to /api/versions/{id}

    // take the result data and put data.editorValue inside the editor

  });

  counter++;
}

// Load existing versions
// ---------------------------

 $.ajax({
    type: "GET",
    url: 'http://localhost:8080/api/versions',
    success: function(data) {
      for(var i = 0; i < data.length; i++) {
        createVersion(data[i]._id)
      }
    }
  });



// Create new versions
// ---------------------------

// Find the save button
var saveButton = document.getElementById('singlebutton');

// Find the column to put the versions in
var versionsCol = document.getElementById('versions');

// When that button is clicked
saveButton.addEventListener('click', function(e) {


  // Don't follow the link
  e.preventDefault();

  // save a version
  $.ajax({
    type: "POST",
    url: 'http://localhost:8080/api/versions',
    data: {
      editorValue: codeeditor.getValue()
    },
    success: function(data) {
      // THE ID IS NOT THERE!
      createVersion(data._id);
    }
  });

// $('.version').connections({
//   to: '.version',
//   'class': 'related'
// });
// console.log('connect')
// // $('.version').connections('update');

// var c = $('connection');
// setInterval(function() {
//   c.connections('update');
// }, 10);

  // Increment counter for next version
  
})


