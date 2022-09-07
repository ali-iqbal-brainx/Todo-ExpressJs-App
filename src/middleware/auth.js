const jwt = require("jsonwebtoken");
const user = require("../../models/user");
const { request, response } = require("express");

const auth = async (request, response, next) => {
    console.log("In Auth");
    try {
        const token = request.cookies.jwt;
        console.log("Token "+token);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const usr = await user.findOne({ _id: verifyUser._id });
        console.log(usr);
        request.usr = usr;
        request.token = token;
        next();

    } catch (err) {
        response.status(401).send(err);
        console.log(err);
    }
}

module.exports={
    auth
};