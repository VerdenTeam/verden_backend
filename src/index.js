const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Config
app.set("port", process.env.PORT || 3000);
require("../database");

// Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//initialize cors
app.use(cors());


// Routes
app.use("/courses/", require("./api/routes//coursesRoutes"));
app.use("/section/", require("./api/routes/sectionRoutes"));
app.use("/part/", require("./api/routes/partRoutes"));

// Starting to server

app.listen(app.get("port"), () => {
    console.log("Server connect in port " + app.get("port"));
})