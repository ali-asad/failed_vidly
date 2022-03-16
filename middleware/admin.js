module.exports = function (req , res , next) {
 //   we assume this middleware function executes after auth middleware function
 // auth middleware function sets req.user so we can access that in this function

 if(! req.user.isAdmin) return res.status(403).send('Access Denied..');

 next();
}