
var textarea;
var codeeditor = '';

function addP5(top,left) {
var code
var data_url
  var maincanvas= document.getElementById("maincanvas")
// var p5= ' <div class="row"><div class="content"><div class="col-lg-6"> <div class= "p5editor"><textarea id="codeeditor" onchange="submit_code()">    </textarea><button type="button" class="btn btn-default btn-lg" onclick="submit_code();">Run</button></div></div><div class="col-lg-6"><div class="frame" > <iframe id="result" height=100%; width=100%;></iframe></div></div></div></div>'
var p5div = document.createElement('div')
  p5div.className = 'p5div';
  // p5div.innterHTML='<div class="row"><div class="content"><div class="col-lg-6"> <div class= "p5editor"><textarea id="codeeditor" onchange="submit_code()">    </textarea><button type="button" class="btn btn-default btn-lg" onclick="submit_code();">Run</button></div></div><div class="col-lg-6"><div class="frame" > <iframe id="result" height=100%; width=100%;></iframe></div></div></div></div>'
 p5div.innerHTML = 
 `
    <div class="content">
      <div class="col-lg-6">
        <div class= "p5editor">
            <textarea id="codeeditor" onchange="submit_code()">function setup(){
createCanvas(200,200);

}
function draw() {
}
            </textarea>
            <button id="run" type="button" class="btn btn-default btn-lg";">Run</button>
          </div>
        </div>
      <div class="col-lg-6"><div class="frame" >
        <iframe id="result" height=100%; width=100%;></iframe>
      </div>
      </div>
    </div>
  `
  maincanvas.appendChild(p5div);

  $(p5div).offset({ top: top, left: left });



 textarea = document.getElementById("codeeditor")
 codeeditor = CodeMirror.fromTextArea(textarea, {
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

// $( "#codeeditor").change(submit_code());
$('#run').click(submit_code)

function submit_code(){

// function submit_code()
// {
    var code = `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.min.js'></script>
        <script>
          try{ ${codeeditor.getValue()} }
          catch(e){
            document.write('<div style="margin:20px"><div class="alert alert-danger"><b>Error:</b> '+e.message+'</div></div>');
          }
        </script>
      </body>
    </html>`

    var previewFrame = document.getElementById('result');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(code);
    preview.close();
// }
};


}
// setInterval(submit_code, 10000)

var p5button = document.getElementById('p5id');
p5button.addEventListener('click', addP5);


// $('#run').onclick(function submit_code(){

// // function submit_code()
// // {
//     var code = `
//         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
//         <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js'></script>
//         <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.min.js'></script>
//         <script>
//           try{ ${codeeditor.getValue()} }
//           catch(e){
//             document.write('<div style="margin:20px"><div class="alert alert-danger"><b>Error:</b> '+e.message+'</div></div>');
//           }
//         </script>
//       </body>
//     </html>`

//     var previewFrame = document.getElementById('result');
//     var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
//     preview.open();
//     preview.write(code);
//     preview.close();
// // }
// });



// Code to add textboxes
// ---------------------------------------------

function addText() {
  // Create a new div 
  var maincanvas= document.getElementById("maincanvas")
  var textbox = document.createElement('div')
  textbox.className = 'textbox';
  textbox.innerHTML = '<textarea rows="2" id=text cols="50" placeholder="Type Here..."></textarea>'
  // console.log(textbox.rows)


  // Add it to the main canvas
  maincanvas.appendChild(textbox);
  $(textbox).draggable({
      drag: function(){
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
        }})
}

var textButton = document.getElementById('textbutton');
textButton.addEventListener('click', addText);

// Code to add questions
// ---------------------------------------------

function addQuestion(top,left,question,answer) {
  // Create a new div 
  // var answer= "test answer"
  var maincanvas= document.getElementById("maincanvas")

  var questbox = document.createElement('div')
  questbox.className = 'questbox';
  questbox.innerHTML = '<textarea rows="1" id=question cols="50" placeholder="QUESTION"></textarea><br><textarea id=answer rows="6" cols="50" placeholder="Type Here..."></textarea>'
    maincanvas.appendChild(questbox);

  $(questbox).offset({ top: top, left: left });
  $(questbox).find('#question').val(question);
  $(questbox).find('#answer').val(answer);

  $(questbox).draggable({ drag: function(){
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
        }})



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







var maincanvas, arduinobutton;

///make elements draggable
$(document).ready(function(){
  arduinobutton = document.getElementById('arduino');
  arduinobutton.addEventListener('click', addArduino);

  //result is working
  maincanvas= document.getElementById("maincanvas")
  $(".frame").draggable();
  
  //not working  
  $("#codeeditor").draggable();
  $(".p5editor").draggable();
});




