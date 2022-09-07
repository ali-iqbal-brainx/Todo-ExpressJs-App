const { response } = require("express");
const UR = require("../models/user");


const addUserQuery = async (name, email, password, request, response) => {
    
    const user = new UR({
        name: name,
        email: email,
        password: password
    });
    const token = await user.generateAuthToken();
    console.log("The token Part :",token);
    // response.cookie("jwt", token,{
    //     // expires: new Date(Date.now()+30000)
    //     httpOnly: true
    // })
    const result = await user.save();
    return result;
}


module.exports = addUserQuery;

