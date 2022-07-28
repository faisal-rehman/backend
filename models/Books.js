const { Model } = require("objection");
class Books extends Model {
  static tableName = "books";
  static get relationMappings() {
    const studentModel = require("./Students");
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: studentModel,
        join: {
          from: "books.student_id",
          to: "students.id",
        },
      },
    };
  }
}

module.exports = Books;
