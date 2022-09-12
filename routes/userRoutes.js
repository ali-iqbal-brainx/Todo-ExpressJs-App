require('dotenv').config();
const userController = require("../controllers/userController");
const todoController = require("../controllers/todoController");
const router = require("express").Router();
const mongoose = require('mongoose');
const authentication = require("../src/middleware/auth");



mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log("Error connecting DB :", err));

//routes for users
router.post("/addUser", authentication.signInAndSignUpAuth, userController.addUser);
router.post("/signIn", authentication.signInAndSignUpAuth, userController.signIn);
router.delete("/deleteUser/:id", authentication.auth, userController.deleteUser);
router.put("/updateUser/:id", authentication.auth, userController.updateUser);
router.post("/checkUserPassword", authentication.auth, userController.checkUserPassword);
router.get("/logout", authentication.auth, userController.logout);
router.post("/forgotPassword", userController.forgotUser);
router.put("/resetPassword", userController.resetPassword);
//routes for todos
router.post("/", authentication.auth, todoController.addTodo);
router.get("/getTodos/:id", authentication.auth, todoController.getTodos);
router.get("/getATodo/:id", authentication.auth, todoController.getATodo);
router.delete("/delete/:id", authentication.auth, todoController.deleteTodo);
router.put("/update/:id", authentication.auth, todoController.updateATodo);


module.exports = router;