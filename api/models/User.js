const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true, min: 4, unique: true },
  passWord: { type: String, required: true },
});

const userModel = model("User", userSchema);

// Export the model
module.exports = userModel;
