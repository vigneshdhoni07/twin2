const otpGenerator = require('otp-generator')

var otp=()=>{
    var code=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
   
    var expiry=5*60*1000
   

   return [code,expiry]
    

}

module.exports={
    otp
}