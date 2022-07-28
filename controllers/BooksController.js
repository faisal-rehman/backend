const knex = require("../db/database");
const Books = require("../models/Books");
const Students = require("../models/Students");

const index = async (req, res) => {
  try {
    const result = await Books.query().withGraphFetched("student");
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await Books.query().updateAndFetchById(id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Updated", row });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Books.query().findById(id).withGraphFetched("student");
    const students = await Students.query();
    res.status(200).json({ success: true, data: result, students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { index, show, update };
