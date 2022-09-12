const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require("../models/user");
const bcrypt = require('bcryptjs');

const checkUserPasswordQuery = async (password, userId) => {

    console.log("In chek user password query");
    const usr = await user.findOne({
        _id: ObjectId(userId),
    });
    console.log(usr);
    if (usr) {
        isMatch = await bcrypt.compare(password, usr.password);
        if(isMatch){
            return usr;
        }
    }
    return false;
}

module.exports = checkUserPasswordQuery;