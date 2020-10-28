const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    coursesID: {type: [String]},
    rating: {type: Number, default: 0, min: 0, max: 10},
    description: {type: String, required: true}
});

module.exports = mongoose.model("Instructor", instructorSchema);