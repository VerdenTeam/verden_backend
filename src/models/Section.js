const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    partsID: {type: [String]},
    courseID: {type: String, required: true}
});

module.exports = mongoose.model("Section", sectionSchema);