const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const constants = require("./public/constants");

app.use('/', require("./routes/userRoutes"));


app.listen(constants.PORT_NUMBER, () => {
    console.log("Server is running on port " + constants.PORT_NUMBER);
});