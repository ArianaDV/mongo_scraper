var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Schema constructor - creates new object
var nSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

var Note = mongoose.model("Note", nSchema);

module.exports = Note;