const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(connect => console.log("Connect to a database"))
.catch(err => console.log(err));