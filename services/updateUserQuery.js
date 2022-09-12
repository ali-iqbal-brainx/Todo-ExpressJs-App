const user = require("../models/user");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');

const updateUserQuery = async (userId, name, email, password) => {

    console.log("In Update User Query", userId, name, email, password);
    password = await bcrypt.hash(password, 10);
    console.log("bcrypt password", password);
    const result = await user.updateOne(
        {
            _id: ObjectId(userId)
        },
        {
            $set: {
                "name": name,
                "email": email,
                "password": password
            }
        }
    );
    return result;
}

module.exports = updateUserQuery;