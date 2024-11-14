const { boolean } = require("joi");
const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    vehicleDetails: {
      type: String,
    },
    driverDetails: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
    itemType: {
      type: String,
      enum: ["eatable", "drinkable", "medicine"],
      required: true,
    },
    isaSpecialPackagingRequired: {
      type: String,
      enum: ["yes", "no"],
      required: "no",
    },
    procurementManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    inspectionManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isChecked:{
      type:Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

const Checklist = mongoose.model("Checklist", checklistSchema);
module.exports = Checklist;
