let Rooms = require("../model/Room");
let Users = require("../model/User");
let Device = require("../model/Device");
let Appliance = require("../model/Appliances");

exports.getroomdetails = async (req, res) => {
  try {
    var id = req.uid;
    var { room_name } = req.body;

    var room = await Rooms.find({ room_owner: id, room_name: room_name });

     //console.log(room)

    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.createroom = async (req, res) => {
  try {
    var { room_name } = req.body;
    var { _devices } = req.body;
    var dev = [...req.dev];

    //console.log(dev);

    var id = req.uid;

    var newroom = {
      room_name: room_name,
      devices: dev,
      room_owner: id,
    };

    var room = await Rooms(newroom).save();

    await Device.updateMany(
      { device_id: _devices },
      { $set: { isAssigned: true } }
    );

    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong ");
  }
};

exports.addroomdevice = async (req, res) => {
  try {
    var { room_name } = req.body;

    var id = req.uid;
    var dev = [...req.dev];
    await Rooms.updateOne(
      { room_name: room_name, room_owner: id },
      { $push: { devices: dev } }
    );

    res.status(200).json("Devices Added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong ");
  }
};

exports.editroomdevice = async (req, res) => {
  try {
    var { room_name } = req.body;
    var { old_id, new_id } = req.body;
    var id = req.uid;
    await Rooms.updateOne(
      { room_name: room_name, room_owner: id },
      { $pull: { devices: { device_id: old_id } } }
    );
    await Rooms.updateOne(
      { room_name: room_name, room_owner: id },
      { $push: { devices: { device_id: new_id } } }
    );
    res.status(200).json("Devices Added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong ");
  }
};

exports.deleteroom = async (req, res) => {
  try {
    var id = req.uid;
    var { room_name } = req.body;
    var devices = [];
    var roomdevice = await Rooms.find({ room_owner: id, room_name: room_name });

    roomdevice.forEach((e) => {
      e.devices.forEach((e1) => {
        devices.push(e1.device_id);
      });
    });

    await Device.updateMany(
      { device_id: devices },
      { $set: { isAssigned: false } }
    );

    console.log(devices);

    await Rooms.deleteOne({ room_owner: id, room_name: room_name });

    res.status(200).json("Deletion Success");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error || "something went wrong" });
  }
};

exports.editroom = async (req, res) => {
  try {
    var id = req.uid;
    var { room_name, new_room_name } = req.body;
    await Rooms.updateOne(
      { room_owner: id, room_name: room_name },
      { $set: { room_name: new_room_name } }
    );

    res.status(200).json("Edit Success");
  } catch (error) {
    res.status(500).json({ message: error || "something went wrong" });
  }
};
exports.allappliancesinroom = async (req, res) => {
  try {
    var id = req.uid;
    var { room_name } = req.body;

    var room = await Rooms.findOne({ room_owner: id, room_name: room_name });
    
    var {devices}=await room.populate("devices")
    var deviceId = [];
    devices.forEach((e) => {
      deviceId.push(e.device_id);
    });
    
    var device=await Device.findOne({device_id:deviceId})
    var {appliances}=await device.populate("appliances")
    
    

    console.log(appliances);
    res.status(200).json(appliances);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Some thing went Wrong" });
  }
};
   