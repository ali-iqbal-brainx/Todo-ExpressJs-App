const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    isDone:{
        type: Boolean,
        require: true
    }
});

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;