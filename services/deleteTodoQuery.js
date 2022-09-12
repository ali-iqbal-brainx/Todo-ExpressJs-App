const TD = require("../models/todo");

const deleteTodoQuery = async (id) => {

    const result = await TD.deleteOne({ _id: id });
    return result;
}

module.exports = deleteTodoQuery;