const TD = require("../models/todo");

const addTodoQuery = async (name, desc, isDone, userId) => {
    const todo = new TD({
        name: name,
        desc: desc,
        isDone: isDone,
        userId: userId

    });
    const result = await todo.save();
    return result;
}


module.exports = addTodoQuery;

