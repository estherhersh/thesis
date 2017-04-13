var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VersionSchema   = new Schema({
    editorValue: String,
    basicElements: {top: Number,left:Number, question: String, answer: String }
    // bearType: String
});

module.exports = mongoose.model('Version', VersionSchema);