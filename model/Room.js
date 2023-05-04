const mongoose = require("mongoose");
var rooms;
try {
  rooms = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    room_name: { type: String, required: true, unique: true },

    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Devices" }],

    room_owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  });
} catch (err) {
  console.log(err);
}

module.exports = mongoose.model("Rooms", rooms);
