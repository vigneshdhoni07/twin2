const mongoose = require("mongoose");
var userSchema;
try {
  userSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,require:true },
    otp: {
      code: { type: String, default: null },
      expiry: { type: Date, default: null },
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appliances" }],
  });
} catch (err) {
  console.log(err);
}

module.exports = mongoose.model("Users", userSchema);
