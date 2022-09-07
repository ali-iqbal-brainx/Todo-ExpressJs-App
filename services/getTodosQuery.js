const TD = require("../models/todo");

const getTodosQuery = async (userId) => {

    console.log("Get Todo Query ",userId);
    const result = await TD.aggregate([
        { $match: { userId: userId } },
        {
            '$project': {
                '_id': 1,
                'name': 1,
                'desc': 1,
                'isDone': 1,
                'userId': 1
            }
        }
    ])
    return result;
}

module.exports = getTodosQuery;