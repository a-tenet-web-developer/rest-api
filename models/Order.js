const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    inspectionManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    procurementManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checklist: { type: mongoose.Schema.Types.ObjectId, ref: "Checklist" },
    status: {
      type: String,
      enum: [
        "CREATED",
        "PENDING",
        "INSERTED",
        "INSPECTED",
        "APPROVED",
        "REJECTED",
      ],
      default: "CREATED",
    },
    file: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
