const mongoose = require("mongoose");
require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(connect => console.log("Connect to a database"))
.catch(err => console.log(err));