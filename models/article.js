var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Schema constructor - creates new object
var aSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
     type: Schema.Types.ObjectId,
     ref: "Note"
    }
});

var Article = mongoose.model("article", aSchema);

module.exports = Article;