const config = require ('config'); //package to store configuration setting in JSON file/ env variable


module.exports = function (){
    //checking the declaration of env variable, if not set then send error.
if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined..');
  } 
}