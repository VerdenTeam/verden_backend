const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost:27017/verden", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(connect => console.log("Connect to a database"))
.catch(err => console.log(err));