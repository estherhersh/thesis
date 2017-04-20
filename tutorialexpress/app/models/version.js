var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VersionSchema   = new Schema({
	editor: {top: Number,left:Number},
    parentId: String,
    editorValue: String,
    basicElements: {top: Number,left:Number, question: String, answer: String }
});

module.exports = mongoose.model('Version', VersionSchema);