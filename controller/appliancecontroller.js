var Appliance = require("../model/Appliances");
var Device = require("../model/Device");

exports.createappliance = async (req, res) => {
  try {
    var { applianceName, device_id ,nodeIndex} = req.body;
      var email=req.email
      console.log(email)
    var newAppliance = {
      applianceName,
      nodeIndex,
      isAssigned:true,
      userMail:email,
      controller_id:device_id
      
    };
    var appliance = await new Appliance(newAppliance).save();

    await Device.updateOne(
      { device_id: device_id },
      { $push: { appliances: appliance._id } }
    );

    res.status(200).json(appliance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.editappliancename = async (req, res) => {
  try {
    var { id, newName } = req.body;

    await Appliance.updateOne(
      { _id: id },
      { $set: { applianceName: newName } }
    );

    res.status(200).json({ message: "update success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.deleteAppliance = async (req, res) => {
  try {
    var { id } = req.body;

    await Appliance.deleteOne({ _id: id });

    //await Device.updateOne({"appliances.appliance_id":id},{$pull:{appliances:{appliance_id:id}}})

    res.status(200).json("Deletion Success");
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Went Wrong");
  }
};
exports.toggle=async(req,res)=>{
  try {
    
    var{switchingstate,id}=req.body

    var nodeStatus=switchingstate[2].toString()==0?false:true

    await Appliance.updateOne({_id:id},{$set:{nodeStatus:nodeStatus}})

    res.status(200).json("Toggle Success")

    
  
  } 
  
  catch (error) {
    res.status(500).json("Something went wrong")
  }
  
}