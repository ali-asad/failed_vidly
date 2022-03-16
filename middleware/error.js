const winston = require('winston');


//Error middleware function,  we call this function everywhere to handle a rejection
module.exports = (function(err , req , res , next){
  //Logging the error
  winston.error(err.message , err); //first arg is message, second arg is for meta-data 

  //error
  //warn
  //info
  //verbose
  //debug
  //silly


  res.status(500).send('Something failed....');
});
