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

var currentVersion = '';
var currentLevel = -1;


//update code on change (only updates first time)
$( "#codeeditor").change(submit_code());


function submit_code()
{
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
}

setInterval(submit_code, 10000)

//  CRASHES  WITH FOR LOOPS
//  codeeditor.on('change', function(e) {
//     setTimeout(submit_code, 5000);
// });


// Code to handle versions
// ---------------------------------------------

var counter = 1;

function createVersion(id,level,parentId) {
  row = $('#sidebar-row-'+level)
  if(!row.length){
    row = $(`<div id="sidebar-row-${level}" class="sidebar-level"></div>`)
    $('.sidebar').append(row)
    // versionsCol.appendChild(row)
  }
    
  // Create a new div DOM element
  // var version = document.createElement('div')
   // var versionElement = document.createElement('div')


  // version.className = 'version';
  // var userInput = version.value;
  //version.innerHTML = ' <input id="'+id+'" placeholder="Version' + counter + '" rows= 1>' ;
  // version.innerHTML = ` <a id="${id}" href="#" class= "sidebar-version">Version ${counter}</a>`

  versionElement= $(`<div id="${id}" class="sidebar-version" data-level="${level}">Version ${counter}</div>`).click(function(e){
    console.log("clicked")
    selectVersion($(this).attr('id'), $(this).data('level'))
  })
  $(row).append(versionElement)


  parentElement = $(`#${parentId}`)
  console.log(parentElement)

  // addConnection(versionElement, parentElement)

  //     $('.sidebar-version').connections({
  //   to: '.sidebar-version',
  //   'class': 'related'
  // });
  // // console.log('connect')
  // $('.sidebar-version').connections('update');

  // var c = $('connection');
  // setInterval(function() {
  //   c.connections('update');
  // }, 10);


  // console.log(userInput)

  // Add it to the #versions column 
  // versionsCol.appendChild(version);
  // $(version).draggable({ containment: "parent"})

  counter++;
}

function selectVersion(id, level){
  // make a get request to /api/versions/{id}
  $.ajax({
    type: "GET",
    url: 'http://localhost:8080/api/versions/'+id,
    contentType : 'application/json',
    success: function(data) {
      currentVersion = id;
      currentLevel = level;

      var code = `
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
          <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.min.js'></script>
          <script>
            try{ ${data.editorValue} }
            catch(e){
              document.write('<div style="margin:20px"><div class="alert alert-danger"><b>Error:</b> '+e.message+'</div></div>');
            }
          </script>
        </body>
      </html>`
        
        // take the result data and put data.editorValue inside the editor
      codeeditor.setValue(data.editorValue);  
      var previewFrame = document.getElementById('result');
      var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
      preview.open()
      preview.write(code)
      preview.close()

      $(".questbox").empty();
      //run through the array of basic elements and draw them to the canvas
      for(i=0;i<data.basicElements.length;i++){
        addQuestion(data.basicElements[i].top,data.basicElements[i].left,data.basicElements[i].question,data.basicElements[i].answer)
        console.log(data.basicElements[i].top,data.basicElements[i].left,data.basicElements[i].question,data.basicElements[i].answer)
        // addQuestion(656,435)
      }
    }
  });
}


function loadChildren(data, id, level){
  let childrenArray = data.filter(function(d){return d.parentId == id })
  $.each(childrenArray, function(i, d){
    createVersion(d._id, level,id)
    loadChildren(data, d._id, level+1)
  })
}

// Load existing versions
// ---------------------------

 $.ajax({
    type: "GET",
    url: 'http://localhost:8080/api/versions',
    success: function(data) {
      let parentArray = data.filter(function(d){return d.parentId == "" })
      $.each(parentArray, function(j, p){
        createVersion(p._id, 0, "")
        loadChildren(data, p._id, 1)
      })

      // id = latest timestamp in data array
      // selectVersion(id)

      // for(var i = 0; i < data.length; i++) {
      //   createVersion(data[i]._id)
      //   currentVersion = data[i]._id
      // }
    }
  });

// Create new versions
// ---------------------------

// Find the save button
var saveButton = document.getElementById('singlebutton');

// Find the column to put the versions in
// var versionsCol = document.getElementById('versions');

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
      top: $(questions[i]).offset().top ,
      left: $(questions[i]).offset().left, 
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
      basicElements: questionsData,
      parentId: currentVersion
    }),
    success: function(data) {
      // THE ID IS NOT THERE!
      currentVersion = data._id;
      currentLevel++;
      createVersion(data._id, currentLevel, data.parentId);
      console.log(basicElements)
    }


  });
})



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
 
