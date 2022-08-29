const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TD = require("../models/todo");



const getATodoQuery = async (id) => {

    const result = await TD.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
            '$project': {
                '_id': 1,
                'name': 1,
                'desc': 1,
                'isDone': 1
            }
        }
    ]);
    return result;
}

module.exports = getATodoQuery;