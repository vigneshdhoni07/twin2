let Device = require("../model/Device");
let Rooms = require("../model/Room");
let Users = require("../model/User");
let authmiddleware=require("../middleware/authvalidator")


const devicevalidator = async (req, res, next) => {
  try {
    var { _devices } = req.body;

    
    let id = req.uid;

    let devices = await Device.find({ device_owner: id });

    var userdevice=[]
    devices.forEach((e)=>{
      if(e.isAssigned)
      {
        if(_devices.includes(e.device_id))
        res.status(400).json({message:`${e.device_id} is already asigned`})
      }
     userdevice.push(e.device_id)
    })
    _devices.forEach((e)=>{
      if(!userdevice.includes(e))
      {
        res.status(400).json({message:`${e} device not assigned to user`})
        return
      }
    })

    var op=await Device.find({device_id:_devices})

    
    
    

    req.dev=op
    next();
  } catch (error) {
    console.log( error);
    res.status(500).json("Something went wrong ");
  }
};
var roomsmiddleware=async(req,res,next)=>{

  try {

    var { room_name } = req.body;

    var room=await Rooms.find({room_name:room_name})
    //console.log(room)

    if(!room.length)
    {
      res.status(400).json({message:"Room not Available"})
    }
    else{
      
      next()
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
  }
}
module.exports = {
  devicevalidator,
  roomsmiddleware
};
