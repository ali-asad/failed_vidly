const jwt = require ('jsonwebtoken');// package to send responce to the client as a Json web tocken
const Joi       = require ('joi');
const config = require ('config'); //package to store configuration setting in JSON file/ env variable
const bcrypt    = require ('bcrypt'); // package to encrypt the passwords
const {User}    = require ('../models/user');
const mongoose  = require ('mongoose');
const express   = require ('express');
const router    = express.Router();

router.post('/' , async (req , res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //finding user through email from database and sending responce to client
    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password...');

    //comparing the password in database and the password provided by client
    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) res.status(400).send('Invalid email or password...');

    //creating a tocken to send the responce to client as a JWT
    const token = user.generateAuthToken();
    res.send(token);
});

// local validate function for authentication
function validate(req)
{
    const schema = {
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(req , schema);
}

module.exports = router;