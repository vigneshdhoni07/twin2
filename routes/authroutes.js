var authcontroller = require("../controller/authcontroller");
var signmiddleware = require("../middleware/signupmiddlewares");

module.exports = (app) => {
  try{

  
  app.post(
    "/api/auth/createuser",
    signmiddleware.signupcheck,
    authcontroller.createUser
  );
  app.post(
    "/api/auth/user_login",
    signmiddleware.signinvalidator,
    authcontroller.userSignup
  );}
  catch(err)
  {
    console.log(err)
  }
};
