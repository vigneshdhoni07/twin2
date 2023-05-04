let Device = require("../model/Device");

const createdevicemiddleware = async (req, res, next) => {
  try {
    let { device_id } = req.body;

    if (!device_id) {
      res.status(400).json({ message: "Device Name Missing" });
    }
    var dev = await Device.findOne({ device_id: device_id });

    if (dev) {
      res.status(400).json({ message: "Device Already Exist" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json();
  }
};

const deletedevicemiddleware = async (req, res, next) => {
  try {
    let { device_id } = req.body;
    if (!device_id) {
      res.status(400).json({ message: "Device Id Missing" });
    }

    var dev = await Device.find({ device_id: device_id });
    if (!dev.length) {
      res.status(400).json({ message: "Device Not Found" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error || "Something went wrong" });
  }
};

const editdevicemiddleware = async (req, res, next) => {
  try {
    let { newName, device_id } = req.body;

    if (Object.keys(req.body).length == 0) {
      res.status(400).json({ message: "DeviceId and  New Name Missing" });
    } else if (!newName) {
      res.status(400).json({ message: "New Name Missing" });
    } else if (!device_id) {
      res.status(400).json({ message: "Device ID Missing" });
    }

    var dev = await Device.find({ device_id: device_id });
    if (!dev.length) {
      res.status(400).json({ message: "Device Not Found" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error || "Something went wrong" });
  }
};

module.exports = {
  createdevicemiddleware,
  deletedevicemiddleware,
//   editdevicemiddleware,
};
