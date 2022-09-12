const jwt = require("jsonwebtoken");
const user = require("../../models/user");

const auth = async (request, response, next) => {

    const token = request.cookies.jwt;
    console.log("In Auth", token);
    if (token) {
        try {
            console.log("Token " + token);
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
            console.log(verifyUser);

            const usr = await user.findOne({ _id: verifyUser._id });
            console.log(usr);
            request.usr = usr;
            request.token = token;
            next();
        } catch (err) {
            response.status(401).json({ message: "User Not identified" });
            console.log(err);
        }
    } else {
        response.status(401).json({ message: "Empty Token You must first Login" });
    }

}

const signInAndSignUpAuth = async (request, response, next) => {
    const token = request.cookies.jwt;
    console.log("In Sign in and sign up user auth :", token);
    if (token) {
        response.status(406).json({ message: "Already Login" });
    } else {
        next();
    }
}


module.exports = {
    auth,
    signInAndSignUpAuth
};