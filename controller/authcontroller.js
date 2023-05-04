const bcrypt = require("bcrypt");
const Users = require("../model/User");

const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    var { name, mobile, email, password } = req.body;

    password = bcrypt.hashSync(password, 5);
    var [code, expiry] = require("../utils/otpgenerator").otp();

    var data = {
      name,
      mobile,
      email,
      password: password,
      otp: {
        code: code,
        expiry: new Date().getTime() + expiry,
      },
    };
    var user = await new Users(data).save();

    res.status(200).json({message:"User Created Successfully"});
  } catch (err) {
    console.log(err)
    if(err.code==11000)
    {
      if(err.keyPattern[mobile]!="Undefined")
      {
        res.status(400).json({message:"Mobile Number Already Exist"});
      }
    }else{
      res.status(500).json({message:"Something Went Wrong"});
    }
  }
};

exports.userSignup = async (req, res) => {
  try {
    var { email, password } = req.body;
    
    var user = await Users.findOne({ email: email });

    var valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      res.status(400).json({message:"Wrong Password"});
      return;
    } else {
      var token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });

      res.status(200).json({
        message:"Login Success",
        token:`${token}`

        
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"something went wrong"});
  }
};
