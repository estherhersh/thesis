


//Create text editor
// var basicElements=[];
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

           ${codeeditor.getValue()} 


    `

    var previewFrame = document.getElementById('result');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(code);
    preview.close();
}

// setInterval(submit_code, 10000)


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


  versionElement= $(`<input id="${id}" class="sidebar-version" data-level="${level}" placeholder= Version${counter}></input>`).click(function(e){
    // console.log("clicked")
    selectVersion($(this).attr('id'), $(this).data('level'))
  })
  $(row).append(versionElement)


  parentElement = $(`#${parentId}`)
  // console.log(parentElement)
  // console.log(currentDate)

//add connections 
      $(`#${parentId}`).connections({
    to: `#${id}`,
    'class': 'related'
  });
  // console.log('connect')
  $(`#${parentId}`).connections('update');

  var c = $('connection');
  setInterval(function() {
    c.connections('update');
  }, 10);
  // Add it to the #versions column 
  // versionsCol.appendChild(version);




  counter++;
}

  function selectVersion(id, level){
  // make a get request to /api/versions/{id}
  $('.sidebar-version').removeClass('selected')
  $(`#${id}`).addClass('selected')

  $.ajax({
    type: "GET",
    url: 'http://104.236.103.38:8080/api/versions/'+id,
    contentType : 'application/json',
    success: function(data) {
      currentVersion = id;
      currentLevel = level;

      var code = `
         
             ${data.editorValue} 
      
   `
        
        // take the result data and put data.editorValue inside the editor
      codeeditor.setValue(data.editorValue);  
      var previewFrame = document.getElementById('result');
      var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
      preview.open()
      preview.write(code)
      preview.close()

      $(".questbox").empty();
      //run through the array of basic elements and draw them to the canvas
      for(i=0;i<2;i++){
        addQuestion(data.basicElements[i].question,data.basicElements[i].answer)
        console.log(data.basicElements[i].question,data.basicElements[i].answer)
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

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
// Load existing versions
// ---------------------------

if(getUsernameFromCookie(document.cookie) != ""){
  username= getUsernameFromCookie(document.cookie)
}else{
  var username= makeid();
}
console.log(username)


var exp = new Date();     //set new date object  
exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 30));     //set it 30 days ahead 
// var username= 'user1'
// cookieuser= getCookie('cookie')
// cookieuser= username



function setCookie(name, value, expires) {  

  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + expires.toGMTString(); 
  // alert(getUsernameFromCookie(document.cookie))
} 

function getUsernameFromCookie(cookie_){
  
  var pos = cookie_.indexOf('username')
  cookie_=cookie_.substring(pos);

  var pos = cookie_.indexOf('=')
  cookie_=cookie_.substring(pos+1);

  var pos = cookie_.indexOf(';')
  if(pos>0){
    cookie_=cookie_.substring(0, pos);
  }
  return cookie_.substring(pos);
}



setCookie('username', username, exp);
// console.log(typeof(document.cookie))
console.log(document.cookie)




// var data = {username: username};

// TODO: Add username to data
 $.ajax({
    type: "GET",
    // url: 'http://localhost:8080/api/versions',
        url: 'http://104.236.103.38:8080/api/versions',

    // data:{ username : 'username2'},
    success: function(data) {

      // data.find({username:username})
      var user = data.filter(function(d){return d.username == username });
            console.log(user)

    // var user=[];
    //   for(i=0;i<data.length;i++){
    //   user.push( data.filter(function(d){return d.username == "user1" }))
    //   }
      
      let parentArray = user.filter(function(d){return d.parentId == "" })
      $.each(parentArray, function(j, p){
        createVersion(p._id, 0, "")
        loadChildren(data, p._id, 1)
      })


      // id = latest timestamp in data array
      // selectVersion(id)
    }
  
  });

// Create new versions
// ---------------------------

// Find the save button
var saveButton = document.getElementById('singlebutton');

// Find the column to put the versions in
// var versionsCol = document.getElementById('versions');

// When SAVE button is clicked
saveButton.addEventListener('click', function(e) {
  // Don't follow the link
  e.preventDefault();

  // Grab
  var questions = document.querySelectorAll('.questbox');
  var question = document.querySelectorAll('#question');
  var answer = document.querySelectorAll('#answer');

    var questionsData=[];

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
    // url: 'http://localhost:8080/api/versions',
        url: 'http://104.236.103.38:8080/api/versions',
    contentType : 'application/json',
    data: JSON.stringify({
      editorValue: codeeditor.getValue(),
      basicElements: questionsData,
      parentId: currentVersion,
      username: username
      // date: Date 

          }),
    success: function(data) {
      // THE ID IS NOT THERE!
      currentVersion = data._id;
      currentLevel++;
      createVersion(data._id, currentLevel, data.parentId);
      // console.log(basicElements)
    }


  });
    window.location.reload();


})

