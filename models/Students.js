const { Model } = require("objection");
class Students extends Model {
  static tableName = "students";
  static get relationMappings() {
    const bookModel = require("./Books");
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: bookModel,
        join: {
          from: "students.id",
          to: "books.student_id",
        },
      },
    };
  }
}
module.exports = Students;
