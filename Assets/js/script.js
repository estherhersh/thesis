//Create text editor
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


//update code on change (only updates first time)
$( "#codeeditor").change(submit_code());


function submit_code()
{
    // codeeditor.save();
    var cdn = "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.min.js'></script><script>"
    var endcdn="</script></body></html>"
    code = cdn + codeeditor.getValue() + endcdn;

        var previewFrame = document.getElementById('result');
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        preview.write(code);
        preview.close();

}

//  CRASHES  WITH FOR LOOPS
//  codeeditor.on('change', function(e) {
//     setTimeout(submit_code, 5000);
// });




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
          $.ajax({
            type: "GET",
            url: 'http://localhost:8080/api/versions/'+id,
            success: function(data) {
              console.log(data.editorValue)

    var cdn = "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.min.js'></script><script>"
    var endcdn="</script></body></html>"
    pastcode = cdn + data.editorValue + endcdn;
  
      
      // take the result data and put data.editorValue inside the editor
        var previewFrame = document.getElementById('result');
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        preview.write(pastcode);
        preview.close();
        codeeditor.setValue(data.editorValue);

            }
          });
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


