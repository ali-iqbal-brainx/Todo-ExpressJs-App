const TD = require("../models/todo");

const addTodoQuery = async (name, desc, isDone) => {
    const todo = new TD({
        name: name,
        desc: desc,
        isDone: isDone
    });
    const result = await todo.save();
    return result;
}


module.exports = addTodoQuery;

