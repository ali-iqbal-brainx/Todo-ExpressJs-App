const addTodoQuery = require("../services/addTodoQuery");
const getTodosQuery = require('../services/getTodosQuery');
const getATodoQuery = require('../services/getATodoQuery');
const deleteTodoQuery = require('../services/deleteTodoQuery');
const updateTodoQuery = require('../services/updateTodoQuery');
const addUserQuery = require("../services/addUserQuery");
const signInQuery = require('../services/signInQuery');




const addUser = async (request, response) => {
    console.log("In AddUser");
    try {
        const { name, email, password, matchPassword } = request.body;
        if (!name || !email || !password || !matchPassword) {
            throw "Empty or Invalid Input";
        } else {
            // create a User Obj and add it to the database

            const result = await addUserQuery(name, email, password, request, response)
                .catch(err => console.log(err));
            if (result.$isEmpty()) {
                response.status(406).json({ message: "Error adding User" });
            } else {
                response.status(200).json({ message: "User Added Successfully" });
            }
        }

    } catch (err) {
        response.status(406).json({ message: err });
    }
}
const signIn = async (request, response) => {
    console.log("In Sign In");
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            throw "Empty or Invalid Input";
        } else {
            const result = await signInQuery(email, password, request, response)
                .catch(err => console.log(err));
            if (result === false) {
                response.status(401).json({ message: "Incorrect Password" });
            } else if (result) {
                response.status(200).json({ tokenAndUserIdObj: result });
            } else {
                response.status(401).json({ message: result });
            }
        }
    } catch (err) {
        response.status(406).json({ message: err });
    }
}
const logout = async (request, response) => {
    console.log("In Log out");
    console.log(request.usr.tokens);
    try {
        request.usr.tokens = request.usr.tokens.filter((currentElement) => {
            return currentElement.token !== request.token
        });
        response.clearCookie("jwt");
        console.log("logout Successfully");
        await request.usr.save();
        response.status(200).json({ message: "Logout Successfully" });
    } catch (err) {
        response.status(500).json({ message: err });
    }
}
const addTodo = async (request, response) => {
    console.log("inside add todo");
    try {
        const { name, desc, isDone, userId } = request.body;
        if (!name || !desc || !userId) {
            throw "Empty or Invalid Input";
        } else {
            // create a Todo Obj and add it to the database
            const result = await addTodoQuery(name, desc, isDone, userId)
                .catch(err => console.log(err));
            if (result.$isEmpty()) {
                response.status(406).json({ message: "Error adding todo" });
            } else {
                response.status(200).json({ message: "Todo Added Successfully" });
            }
        }

    } catch (err) {
        response.status(406).json({ message: err });
    }
}

const getTodos = async (request, response) => {
    const userId = request.params.id;
    console.log("user id", userId);
    if (userId) {
        try {
            const result = await getTodosQuery(userId)
                .catch(err => console.log(err));
            if (result) {
                response.status(200).json({ TodoArray: result });
            } else {
                response.status(404).json({ message: "Todo Database is Empty or unable to fetch the todos" });
            }
        } catch (err) {
            response.status(406).json({ message: err });
        }
    } else {
        console.log("User not logged in");
        response.status(401).json({ message: "Unauthorized User" });
    }

}

const getATodo = async (request, response) => {
    const { id } = request.params;

    try {
        const result = await getATodoQuery(id)
            .catch(err => { console.log(err) });
        if (result) {
            response.status(200).json({ Todo: result });
        } else {
            response.status(404).json({ message: "Unable to find or To-do with id " + id + " is not present" });
        }
    } catch (err) {
        console.log(err);
        response.status(406).json({ message: "To-do with id " + id + " is not present" });
    }
}

const deleteTodo = async (request, response) => {
    const { id } = request.params;

    try {
        const result = await deleteTodoQuery(id)
            .catch(err => console.log(err));
        if (result.deletedCount > 0) {
            response.status(200).json({ message: "To-do deleted successfully" });
        } else {
            response.status(404).json({ message: "Unable to delete todo or To-do with id " + id + " is not present" });
        }
    } catch (err) {
        console.log(err);
        response.status(406).json({ message: "To-do with id " + id + " is not present" });
    }
}

const updateATodo = async (request, response) => {
    const { name, desc, isDone, userId } = request.body;
    const id = request.params.id;
    try {
        if (!desc || !name) {//when inputs are empty
            throw "Empty or Invalid Input";
        }
        else {
            try {
                const result = await updateTodoQuery(id, name, desc, isDone, userId)
                    .catch(err => console.log(err));
                if (result.modifiedCount > 0) {
                    response.status(200).json({ message: "To-do Updated successfully" });
                }
                else {
                    response.status(406).json({ message: "You have not updated the todo yet plz update Todo and then hit enter or Todo id is invalid" });
                }
            } catch (err) {
                console.log(err);
                response.status(404).json({ message: "Invalid Todo id :" + id });
            }
        }

    } catch (err) {
        response.status(406).json({ message: err });
    }
}

module.exports = {
    addTodo,
    updateATodo,
    getATodo,
    getTodos,
    deleteTodo,
    addUser,
    signIn,
    logout
};