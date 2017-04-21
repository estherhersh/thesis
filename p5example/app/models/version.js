var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VersionSchema   = new Schema({
	parentId: String,
    editorValue: String,
    // basicElements: {top: Number,left:Number, question: String, answer: String }
    basicElements: [{question: String, answer: String }],
},{timestamps:true});

module.exports = mongoose.model('Version', VersionSchema);