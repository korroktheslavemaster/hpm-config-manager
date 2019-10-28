var mongoose = require("mongoose");
var ConfigSchema = new mongoose.Schema({
  params: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true }
    }
  ],
  status: {
    type: String,
    enumValues: ["pending", "running", "completed"],
    default: "pending"
  },
  result: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("Config", ConfigSchema);
