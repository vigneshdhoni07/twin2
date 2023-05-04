var Device = require("../model/Device");
const appliancemiddleware = async (req, res, next) => {
  try {
    var { applianceName, device_id } = req.body;

    if (Object.keys(req.body).length == 0) {
      res
        .status(400)
        .json({ message: "Appliance Name and Device_id is Missing" });
    } else if (!applianceName) {
      res.status(400).json({ mesage: "Appliance Name Missing" });
    } else if (!device_id) {
      res.status(400).json({ mesage: "Device Id Missing" });
    } else {
      var nodes = device_id[0];
      var device = await Device.findOne({ device_id: device_id });
      console.log(device.appliances.length);
      if (device.appliances.length >= nodes) {
        res.status(400).json("No Free Node Available on Device");
      } else {
        next();
      }
    }
  } catch (error) {}
};

module.exports = {
  appliancemiddleware,
};
