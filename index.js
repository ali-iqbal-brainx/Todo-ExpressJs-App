require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");


console.log("In Index");
app.use(cookieParser());
app.use('/', require("./routes/userRoutes"));


app.listen(process.env.PORT_NUMBER, () => {
    console.log("Server is running on port " + process.env.PORT_NUMBER);
});