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




  //    var sidebarWidth = $('.sidebar').width();//get width automaticly
  // $('.sidebar').hover(function() {
  //   if($(this).css("margin-right") == -200+"px" && !$(this).is(':animated'))
  //   {
  //       $('.sidebar').animate({"margin-right": '-='+100});
  //   }
  //   else
  //   {
  //       if(!$(this).is(':animated'))//perevent double click to double margin
  //       {
  //           $('.sidebar').animate({"margin-right": '+='+100});
  //       }
  //   }


  // });

});

// $( document ).click(function() {
//   $( "#versions" ).animate({"margin-right": '-=200'});
// });


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

  // save a bear
  // $.ajax({
  //   type: "POST",
  //   url: 'http://localhost:3000/api/bears',
  //   data: {
  //     name: "Rune",
  //     bearType: 'grizzly'
  //   },
  //   success: function(data) {
  //     console.log('done!')
  //     console.log(data)
  //   },
  //   dataType: dataType
  // });

  // Create a new div DOM element
  var version = document.createElement('div')
  version.className = 'version';
  // var userInput = version.value;
  version.innerHTML = ' <input id="versionName" placeholder="Version' + counter + '" rows= 1>' ;
  // console.log(userInput)

  // Add it to the #versions column 
  versionsCol.appendChild(version);
  $(version).draggable({ containment: "parent"})
$('.version').connections({
  to: '.version',
  'class': 'related'
});
console.log('connect')
// $('.version').connections('update');

var c = $('connection');
setInterval(function() {
  c.connections('update');
}, 10);

  // Increment counter for next version
  counter++;
})


