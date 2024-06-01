const db = require("../../database");

module.exports = {
  allCategories: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT id, name FROM Categories WHERE status = 1;", (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },
};
