const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { request, response } = require('express');


const TD = require("../models/todo");

const addTodo = async (request, response) => {
    try {
        const { name, desc } = request.body;
        if (!name || !desc) {
            throw "Empty or Invalid Input";
        } else {
            // create a Todo Obj and add it to the database
            try {
                const todo = new TD({
                    name: name,
                    desc: desc
                });
                const result = await todo.save();
                if (result.$isEmpty()) {
                    response.status(406).json({ message: "Error adding todo" });
                } else {
                    response.status(200).json({ message: "Todo Added Successfully" });
                }

            } catch (err) {
                response.status(406).json({ message: err });
            }
        }

    } catch (err) {
        response.status(406).json({ message: err });
    }
}

const getTodos = async (request, response) => {
    console.log("inside get all")
    try {
        const result = await TD.aggregate([
            {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'desc': 1
                }
            }
        ])
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
        // const result = await TD.find({ _id: id });
        const result = await TD.aggregate([
            { $match: { _id: ObjectId(id) } },
            {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'desc': 1
                }
            }
        ]);
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
        const result = await TD.deleteOne({ _id: id });
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
    const { name, desc } = request.body;
    const id = request.params.id;
    try {
        if (!desc || !name) {//when inputs are empty
            throw "Empty or Invalid Input";
        }
        else {
            try {
                const result = await TD.updateOne(
                    {
                        _id: id
                    },
                    [{ $set: { "name": name, "desc": desc } }]
                );
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