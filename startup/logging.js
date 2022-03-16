const winston = require ('winston');
require ('winston-mongodb');
require ('express-async-errors'); // package to wrap route handlers in try-catch block to handle rejections

module.exports = function (){ 
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true , prettyPrint: true}),
        new winston.transports.File({filename: 'uncuaghtExceptions.log'}));
  
    //to caught the exception that are out of the Express scope.
    //this approach only works for synchronous code. 
    process.on('unhandledRejection' , (ex) => {
    // console.log('WE GOT AN UNHANDLED REJECTION');
    throw ex;
  });

  
    winston.add(winston.transports.File , {filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, { 
        db: 'mongodb://localhost/vidly',
        level: 'info'
    });
}