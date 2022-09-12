require('dotenv').config();
const UR = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function wrapedSendMail(credentialEmail, link) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        });
        var mailOptions = {
            from: "bcsf18m035@pucit.edu.pk",
            to: credentialEmail,
            subject: "Password Reset for Todo App",
            text: "Click on the link to reset password\n" + link + "\nLink Expires in 15 minutes"
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve(false); 
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    })
}
const forgotUserQuery = async (email, credentialEmail) => {
    console.log("Email pass", email);

    try {
        const user = await UR.findOne({
            email: email,
        });
        if (user) {
            const secret = process.env.SECRET_KEY + user.password;
            const payload = {
                email: user.email,
                id: user._id
            }
            const token = jwt.sign(payload, secret, {
                expiresIn: "15m"
            })
            const link = `http://localhost:3000/setPassword/${user._id}/${token}`;
            console.log("Link :", link);
            
            const resp = await wrapedSendMail(credentialEmail, link);
            if(resp){
                return "Email sent";
            }else{
                return "Error sending Email";
            }
        } else {
            console.log("in else");
            throw ("User not found");
        }
    } catch (err) {
        if (err === "User not found") {
            return "user not found"
        } else {
            return "Error sending Email";
        }
    }

}

module.exports = forgotUserQuery;
