const TD = require("../models/todo");

const updateTodoQuery = async (id,name,desc,isDone) => {

    const result = await TD.updateOne(
        {
            _id: id
        },
        [{ $set: { "name": name, "desc": desc, "isDone": isDone } }]
    );
    return result;
}

module.exports = updateTodoQuery;