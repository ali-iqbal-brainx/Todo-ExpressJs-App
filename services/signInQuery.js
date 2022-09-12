const UR = require("../models/user");
const bcrypt = require('bcryptjs');

const signInQuery = async (email, password, request, response) => {
    let isMatch = false;
    console.log("Email pass", email, password);

    const user = await UR.findOne({
        email: email,
    });
    console.log("User :", user);
    if (user) {
        isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            //generate token 
            const token = await user.generateAuthToken();
            console.log("The token Part :", token);
            response.cookie("jwt", token, {
                // expires: new Date(Date.now()+30000)
                httpOnly: true,
                // secure: true
            })
            //return user obj
            const obj = {
                token: token,
                userId: user._id
            }
            return obj;
        } else {
            console.log("In false");
            return false;
        }
    } else {
        return "Incorrect Email";
    }

}

module.exports = signInQuery;
