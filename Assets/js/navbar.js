 
$codeeditor = $('<textarea id="codeeditor" width=400px height=400px></textarea>',
				'<button onclick="submit_code();">Run</button>');

$(document).ready(function(){


 $('.content').append($codeeditor)

});


// <textarea id="codeeditor" width=400px height=400px></textarea>
//                     <button onclick="submit_code();">Run</button>