const knex = require("../db/database");
const Students = require("../models/Students");
const Books = require("../models/Books");

const index = async (req, res) => {
  try {
    const result = await Students.query().withGraphFetched("books");
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, books } = req.body;
  try {
    const ids = books.split(",");
    await Books.query().where("student_id", id).patch({ student_id: null });
    await Books.query().whereIn("id", ids).patch({ student_id: id });
    const obj = { first_name, last_name };
    const row = await Students.query()
      .updateAndFetchById(id, obj)
      .withGraphFetched("books");
    res.status(200).json({
      success: true,
      message: "Updated",
      row,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Students.query()
      .findById(id)
      .withGraphFetched("books");
    const books = await Books.query();
    res.status(200).json({ success: true, data: result, books });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = { index, show, update };
