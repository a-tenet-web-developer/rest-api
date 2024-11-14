const Checklist = require("../models/Checklist");

exports.createChecklist = async (req, res) => {
  const {
    procurementManager,
    inspectionManager,
    itemName,
    driverDetails,
    vehicleDetails,
    totalAmount,
    itemType,
    isaSpecialPackagingRequired,
  } = req.body;

  const checklist = new Checklist({
    procurementManager,
    inspectionManager,
    itemName,
    driverDetails,
    vehicleDetails,
    totalAmount,
    itemType,
    isaSpecialPackagingRequired,
  });

  try {
    await checklist.save();
    res.status(201).json({ message: "Checklist created", checklist });
  } catch (err) {
    res.status(500).json({ message: "Error creating checklist", error: err });
  }
};

exports.approveChecklist = async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);
  if (!checklist)
    return res.status(404).json({ message: "Checklist not found" });

  checklist.isChecked = true;
  await checklist.save();
  res.json({ message: "Checklist approved", checklist });
};
