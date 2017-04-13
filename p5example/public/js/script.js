


//Create text editor
var basicElements=[];
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
var nodes= [];
var edges= [];

function createVersion(id) {
  // Create a new div DOM element
  var version = document.createElement('div')
  version.className = 'version';
  // var userInput = version.value;
  //version.innerHTML = ' <input id="'+id+'" placeholder="Version' + counter + '" rows= 1>' ;
  version.innerHTML = ' <a id="'+id+'" href="#">Version' +counter+ '</a>' ;
  // console.log(userInput)


var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="390" height="65">' +
            '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
            '<foreignObject x="15" y="10" width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            ' <em>I</em> am' +
            '<span style="color:white; text-shadow:0 0 20px #000000;">' +
            ' HTML in SVG!</span>' +
            '</div>' +
            '</foreignObject>' +
            '</svg>';
            
    nodes.push({id: counter, label: "Version" + counter})
    edges.push({from: counter, to: counter-1})

  // var edges = new vis.DataSet([
  //   {from: counter, to: counter-1}
  // ]);

var container = document.getElementById('versions');
  var data = {
    'nodes': nodes,
    'edges': edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);

  // Add it to the #versions column 
  versionsCol.appendChild(version);
  $(version).draggable({ containment: "parent"})

  $(version).find('a').click(function(e) {

    e.preventDefault();

    var id = $(this).attr('id');
     // $( "div" ).removeClass( "questbox" )
    // console.log('I clicked ' + id)

    // make a get request to /api/versions/{id}
          $.ajax({
            type: "GET",
            url: 'http://localhost:8080/api/versions/'+id,
            contentType : 'application/json',
            success: function(data) {
              // console.log(data.editorValue)


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

              $(".questbox").empty();
              //run through the array of basic elements and draw them to the canvas
              for(i=0;i<data.basicElements.length;i++){
              // addQuestion(data.basicElements[i].top,data.basicElements[i].left,data.basicElements[i].question,data.basicElements[i].answer)
              // console.log(data.basicElements[i].top,data.basicElements[i].left,data.basicElements[i].question,data.basicElements[i].answer)
              // addQuestion(656,435)
              addQuestion(data.basicElements[i].question,data.basicElements[i].answer)

              }


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
      console.log(data)

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

  // Grab
  var questions = document.querySelectorAll('.questbox');
  var question = document.querySelectorAll('#question');
  var answer = document.querySelectorAll('#answer');

  var questionsData = [];
  for(var i = 0; i < questions.length; i++) {
        // var top= $(questions[i]).position().top 
        // console.log(top)
    questionsData.push({
      // top: $(questions[i]).offset().top ,
      // left: $(questions[i]).offset().left, 
      answer: $(answer[i]).val(), 
      question: $(question[i]).val() 
    })
  }


  // save a version
  $.ajax({
    type: "POST",
    url: 'http://localhost:8080/api/versions',
    contentType : 'application/json',
    data: JSON.stringify({
      editorValue: codeeditor.getValue(),
      basicElements: questionsData
    }),
    success: function(data) {
      // THE ID IS NOT THERE!
      createVersion(data._id);
      console.log(data._id)

      console.log(basicElements)
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


