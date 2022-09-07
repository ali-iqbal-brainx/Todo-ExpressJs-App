const UR = require("../models/user");
const bcrypt = require('bcryptjs');



const signInQuery = async (email, password, request, response) => {
    try {
        const user = await UR.findOne({
            email: email,
        });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            const token = await user.generateAuthToken();
            console.log("The token Part :", token);
            response.cookie("jwt", token, {
                // expires: new Date(Date.now()+30000)
                httpOnly: true,
                // secure: true
            })
            if(isMatch){
                const obj={
                    token: token,
                    userId: user._id
                }
                return obj;
            }else{
                return false;
            }
        } else {
            throw "Incorrect Email";
        }
    } catch (err) {
        console.log(err);
        return "Incorrect Email";
    }

}

module.exports = signInQuery;
