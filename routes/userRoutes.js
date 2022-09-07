require('dotenv').config();
const userController = require("../controllers/userController");
const router = require("express").Router();
const mongoose = require('mongoose');
const authentication= require("../src/middleware/auth");
const { request, response } = require('express');



mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log("Error connecting DB :", err));

router.post("/",authentication.auth, userController.addTodo);
router.post("/addUser", userController.addUser);
router.post("/signIn", userController.signIn);
router.get("/getTodos/:id", authentication.auth, userController.getTodos);
router.get("/getATodo/:id", authentication.auth, userController.getATodo);
router.delete("/delete/:id", authentication.auth, userController.deleteTodo);
router.put("/update/:id", authentication.auth, userController.updateATodo);
router.get("/logout",authentication.auth, userController.logout);

module.exports = router;