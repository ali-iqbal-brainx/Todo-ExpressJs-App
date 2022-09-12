const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require("../models/user");
const TD = require("../models/todo");

//delete the entries of current user in Todo document
const deleteTodosQuery = async (userId) => {
    console.log("In delete todos query");
    const result = await TD.deleteMany({ userId: userId });
    return result;
}

const deleteUserQuery = async (id) => {
    console.log("In delete Query");
    const result = await user.deleteOne({ _id: ObjectId(id) });
    if(result.deletedCount>0){
        const dltTodos = await deleteTodosQuery(id);
        if(dltTodos.deletedCount>0){
            console.log("Todos Deleted");
        }
    }
    return result;
}

module.exports = deleteUserQuery;