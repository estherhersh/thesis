var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VersionSchema   = new Schema({
    editorValue: String
    // bearType: String
});

module.exports = mongoose.model('Version', VersionSchema);