const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;


app.use('/', require("./routes/userRoutes"));


app.listen(port, () => {
    console.log("Server is running on port " + port);
});