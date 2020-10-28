const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partSchema = new Schema({
    name: {type: String, required: true},
    position: {type: Number, required: true},
    content: String,
    courseID: {type: String, required: true},
    sectionID: {type: String, required: true}
})

module.exports = mongoose.model("Part", partSchema);