require('dotenv').config();
const UR = require("../models/user");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const resetPasswordQuery = async (id, token, password) => {
    console.log("reset Password Query", id, token, password);
    const user = await UR.findOne({
        _id: ObjectId(id)
    });
    if (user) {
        const secret = process.env.SECRET_KEY + user.password;
        try {
            const payload = jwt.verify(token, secret);
            console.log("Payload :", payload);
            const hashPassword = await bcrypt.hash(password, 10);
            const updateUser = await UR.updateOne({
                _id: ObjectId(id)
            },
                {
                    $set: {
                        "password": hashPassword
                    }
                });
            return true;
        } catch (error) {
            console.log("Error :", error);
            return false;
        }
    } else {
        console.log("Invalid user Id");
        return false;
    }

}

module.exports = resetPasswordQuery;
