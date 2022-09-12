require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        require: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.methods.generateAuthToken= async function(){
    try{
        const token= await jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(error){
        console.log("Error part"+ error);

    }
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt .hash(this.password, 10);
    }
    next();
})

const user = mongoose.model("user", userSchema);
module.exports = user;