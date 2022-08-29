const TD = require("../models/todo");

const getTodosQuery = async (request, response) => {

    const result = await TD.aggregate([
        {
            '$project': {
                '_id': 1,
                'name': 1,
                'desc': 1,
                'isDone': 1
            }
        }
    ])
    return result;
}

module.exports = getTodosQuery;