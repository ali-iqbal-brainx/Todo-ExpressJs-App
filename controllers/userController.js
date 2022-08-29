const addTodoQuery = require("../services/addTodoQuery");
const getTodosQuery = require('../services/getTodosQuery');
const getATodoQuery = require('../services/getATodoQuery');
const deleteTodoQuery = require('../services/deleteTodoQuery');
const updateTodoQuery = require('../services/updateTodoQuery');

const addTodo = async (request, response) => {
    try {
        const { name, desc, isDone } = request.body;
        if (!name || !desc) {
            throw "Empty or Invalid Input";
        } else {
            // create a Todo Obj and add it to the database
            const result = await addTodoQuery(name, desc, isDone)
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
    console.log("inside get all");
    try {
        const result = await getTodosQuery(request, response)
            .catch(err => console.log(err));
        if (result.length > 0) {
            response.status(200).json({ TodoArray: result });
        } else {
            response.status(404).json({ message: "Todo Database is Empty or unable to fetch the todos" });
        }
    } catch (err) {
        response.status(406).json({ message: err });
    }
}

const getATodo = async (request, response) => {
    const { id } = request.params;

    try {
        const result = await getATodoQuery(id)
            .catch(err => { console.log(err) });
        if (result.length > 0) {
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
    const { name, desc, isDone } = request.body;
    const id = request.params.id;
    try {
        if (!desc || !name) {//when inputs are empty
            throw "Empty or Invalid Input";
        }
        else {
            try {
                const result = await updateTodoQuery(id, name, desc, isDone)
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
    deleteTodo
};