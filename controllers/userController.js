const addUserQuery = require("../services/addUserQuery");
const signInQuery = require('../services/signInQuery');
const deleteUserQuery = require("../services/deleteUserQuery");
const checkUserPasswordQuery = require("../services/checkUserPasswordQuery");
const updateUserQuery = require("../services/updateUserQuery");
const forgotUserQuery = require("../services/forgotUserQuery");
const resetPasswordQuery = require("../services/resetPasswordQuery");


const checkUserPassword = async (request, response) => {

    const { password, userId } = request.body;
    console.log("In check User Password", userId, password);
    if (userId && password) {

        const result = await checkUserPasswordQuery(password, userId)
            .catch(err => console.log(err));
        if (result) {
            response.status(200).json({ userObject: result });
        }
        else {
            response.status(404).json({ message: "Password is Wrong" });
        }

    } else {
        response.status(406).json({ message: "User Id or Password is not set" });
    }
}

const addUser = async (request, response) => {
    console.log("In AddUser");
    try {
        const { name, email, password, matchPassword } = request.body;
        if (!name || !email || !password || !matchPassword) {
            throw "Empty or Invalid Input";
        } else {
            // create a User Obj and add it to the database

            const result = await addUserQuery(name, email, password, request, response)
                .catch(err => console.log(err));
            if (result.$isEmpty()) {
                response.status(406).json({ message: "Error adding User" });
            } else {
                response.status(200).json({ message: "User Added Successfully" });
            }
        }

    } catch (err) {
        response.status(406).json({ message: err });
    }
}
const signIn = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            throw "Empty or Invalid Input";
        } else {
            const result = await signInQuery(email, password, request, response)
                .catch(err => console.log(err));
            console.log(result);
            if (result === false) {
                response.status(401).json({ message: "Incorrect Password" });
            } else if (result === "Incorrect Email") {
                response.status(401).json({ message: result });
            } else {
                response.status(200).json({ tokenAndUserIdObj: result });
            }
        }
    } catch (err) {
        response.status(401).json({ message: err });
    }
}
const logout = async (request, response) => {
    console.log("In Log out");
    console.log(request.usr.tokens);
    try {
        request.usr.tokens = request.usr.tokens.filter((currentElement) => {
            return currentElement.token !== request.token
        });
        response.clearCookie("jwt");
        console.log("logout Successfully");
        await request.usr.save();
        response.status(200).json({ message: "Logout Successfully" });
    } catch (err) {
        response.status(500).json({ message: err });
    }
}

const deleteUser = async (request, response) => {
    const userId = request.params.id;
    if (userId) {
        console.log("delete user id: ", userId);
        try {
            //first logout user
            request.usr.tokens = request.usr.tokens.filter((currentElement) => {
                return currentElement.token !== request.token
            });
            response.clearCookie("jwt");
            console.log("logout Successfully");
            await request.usr.save();
            //then delete that user
            const result = await deleteUserQuery(userId)
                .catch(err => console.log(err));
            if (result.deletedCount > 0) {
                response.status(200).json({ message: "User deleted successfully" });
            } else {
                response.status(404).json({ message: "Unable to delete todo or To-do with id " + userId + " is not present" });
            }
        } catch (err) {
            console.log(err);
            response.status(406).json({ message: err });
        }
    } else {
        response.status(406).json({ message: "Empty userId" });
    }

}

const updateUser = async (request, response) => {
    const { name, email, password } = request.body;
    const userId = request.params.id;
    if (userId) {
        if (!name || !email || !password) {
            response.status(406).json({ message: "Empty or Invalid Data" });
        } else {
            try {
                const result = await updateUserQuery(userId, name, email, password)
                    .catch(err => console.log(err));
                if (result.modifiedCount > 0) {
                    //logout user
                    request.usr.tokens = request.usr.tokens.filter((currentElement) => {
                        return currentElement.token !== request.token
                    });
                    response.clearCookie("jwt");
                    console.log("logout Successfully");
                    await request.usr.save();
                    response.status(200).json({ message: "User Updated successfully" });
                }
                else {
                    response.status(406).json({ message: "You don't update the user update it" });
                }
            } catch (err) {
                response.status(401).json({ message: "Invalid User id :" + userId });
            }
        }
    } else {
        response.status(406).json({ message: "Empty User Id" });
    }
}

const forgotUser = async (request, response) => {
    const { email, credentialEmail } = request.body;
    console.log("In forgot User fn ", email, credentialEmail);
    if (email) {
        const result = await forgotUserQuery(email, credentialEmail)
            .catch(err => console.log(err));
        console.log(result);
        if (result === "user not found") {
            response.status(401).json({ message: "user not found" });
        }
        else if (result === "Error sending Email") {
            response.status(201).json({ message: result });
        } else {
            response.status(200).json({ message: "Email for password Reset Sent Successfully" });
        }
    } else {
        response.status(404).json({ message: "Email is Empty" });
    }
}

const resetPassword = async (request, response) => {
    const { id, token, password } = request.body;
    console.log("In reset password fn :", id, token, password);
    if (id && token && password) {
        const result = await resetPasswordQuery(id, token, password)
            .catch(err => console.log(err));
        result ? response.status(200).json({ message: "password changed successfully" }) : response.status(401).json({ message: "Error changing password" });
    } else {
        response.status(404).json({ message: "Invalid Request" });
    }
}
module.exports = {
    addUser,
    signIn,
    logout,
    deleteUser,
    checkUserPassword,
    updateUser,
    forgotUser,
    resetPassword
};