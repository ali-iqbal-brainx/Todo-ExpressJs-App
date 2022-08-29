const userController = require("../controllers/userController");
const router = require("express").Router();
const mongoose = require('mongoose');
const constants = require("../public/constants");


mongoose.connect(constants.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log("Error connecting DB :", err));


router.post("/", userController.addTodo);
router.get("/getTodos", userController.getTodos);
router.get("/getATodo/:id",userController.getATodo);
router.delete("/delete/:id", userController.deleteTodo);
router.put("/update/:id", userController.updateATodo);

module.exports = router;