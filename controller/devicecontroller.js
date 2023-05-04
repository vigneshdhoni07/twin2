const Users = require("../model/User");
const Devices = require("../model/Device");
const Appliance = require("../model/Appliances");
exports.setupdevice = async (req, res) => {
  try {
    var email = req.email;

    

    var { device_id } = req.body;

    let new_device = {
      createdAt: new Date(),

      device_id: device_id,

      device_owner: email
    };

    let newdevice = await new Devices(new_device).save();
    res.status(200).json(newdevice);
  } catch (err) {
    console.log(err);
    res.status(500).json(err || "Something Went Wrong");
  }
};

exports.getAlldevicesofUser = async (req, res) => {
  try {
    let email = req.email;

    let devices = await Devices.find({ device_owner: email });

    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error || "Something went wrong" });
  }
};

// exports.editDevicename = async (req, res) => {
//   try {
//     let id = req.uid;
//     let {  newName ,device_id } = req.body;
//       await Devices.updateOne(
//       { device_owner: id, device_id},
//        {$set:{device_name:newName}}
//     );

//     res.status(200).json("Edit Success");
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: err || "Something went wrong" });
//   }
// };

exports.deleteDevice = async (req, res) => {
  try {
    let email = req.email;
    let { device_id } = req.body;
    let devices = await Devices.deleteMany({
      device_owner: email,

      device_id: device_id,
    });

    res.status(200).json("Delete Success");
  } catch (error) {
    res.status(500).json({ message: err || "Something went wrong" });
  }
};

exports.allapplianceindevice = async (req, res) => {
  try {
    var { device_id } = req.body;

    var device = await Devices.findOne({ device_id: device_id });

    var { appliances } = await device.populate("appliances");

    console.log(appliances);
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(400).json("something went wrong");
  }
};
