const Order = require("../models/Order");
const User = require("../models/User");
const Checklist = require("../models/Checklist");
const { Readable } = require("stream");
const { log } = require("console");

exports.createOrder = async (req, res) => {
  console.log("1");

  const { clientId, checklistId, procurementManagerId, inspectionManagerId } =
    req.body;

  const client = await User.findById(clientId);

  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }
  const findChecklist = await Checklist.findById(checklistId);

  if (!findChecklist) {
    return res.status(404).json({ message: "Checklist not found" });
  }

  const order = new Order({
    inspectionManager: inspectionManagerId,
    client: clientId,
    checklist: checklistId,
    procurementManager: procurementManagerId,
  });

  if (req.file) {
    order.file = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }

  try {
    await order.save();
    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err });
  }
};
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate(
    "client procurementManager checklist"
  );
  res.json(orders);
};
exports.changeOrderStatus = async (req, res) => {
  const orders = await Order.findById(req.params.id);
  if (!orders) return res.status(404).json({ message: "Order not found" });
  orders.status = "APPROVED";
  await orders.save();
  res.json({ message: "Order approved", orders });
};
exports.getOrderStatus = async (req, res) => {
  const orders = await Order.findById(req.params.id);
  if (!orders) return res.status(404).json({ message: "Order not found" });
  let { status } = orders;
  res.json({ status });
};
exports.getOrderFile = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || !order.file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.set("Content-Type", order.file.contentType);
    const stream = new Readable();
    stream.push(order.file.data);
    stream.push(null);
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file", error });
  }
};
