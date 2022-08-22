const userController = require("../controllers/userController");
const router = require("express").Router();
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/tododb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log("Error connecting DB :", err));


router.post("/", userController.addTodo);
router.get("/getTodos", userController.getTodos);
router.get("/getATodo/:id",userController.getATodo);
router.delete("/delete/:id", userController.deleteTodo);
router.put("/update/:id", userController.updateATodo);

module.exports = router;