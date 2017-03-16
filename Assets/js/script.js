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







// Code to handle versions
// ---------------------------------------------

var counter = 1;

// Find the save button
var saveButton = document.getElementById('singlebutton');

// Find the column to put the versions in
var versionsCol = document.getElementById('versions');

// When that button is clicked
saveButton.addEventListener('click', function(e) {

  // Don't follow the link
  e.preventDefault();

//How to save and access these later on??/

  // Create a new div DOM element
  var version = document.createElement('div')
  version.className = 'version';
  // var userInput = version.value;
  version.innerHTML = ' <input id="versionName" placeholder="Version' + counter + '" rows= 1>' ;
  // console.log(userInput)

  // Add it to the #versions column 
  versionsCol.appendChild(version);

  // Increment counter for next version
  counter++;
})
