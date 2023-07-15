const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const {readdirSync} = require("fs"); // file system
require("dotenv").config();

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares 
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" })); // To parse the json data that will be passed between client and server, if data is greater than 2mb , it will reject
app.use(cors()); // To avoid restrictions

// routes middleware
readdirSync('./routes').map((r) => 
    app.use("/api",require("./routes/"+r))
);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));