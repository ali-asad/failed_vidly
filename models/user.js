const jwt = require ('jsonwebtoken');
const config = require ('config');
const Joi = require ('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:10,
        maxlength: 250
    },
    password: {
        type: String,
        required: true,
        minlength:5,
        maxlength:1024
    },
    isAdmin: {
        type: Boolean
    }
});
    //adding a method in the schema .generateAuthToken
    userSchema.methods.generateAuthToken = function() {
        //creating the token inside user schema to avoid duplication.
        const token = jwt.sign({
            _id: this._id,
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin,
            password: this.password
        }, config.get('jwtPrivateKey'));
        return token;
    };

const User = mongoose.model('User' , userSchema);

function validateUser(user)
{
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(user , schema);
}

exports.User = User;
exports.validate = validateUser;