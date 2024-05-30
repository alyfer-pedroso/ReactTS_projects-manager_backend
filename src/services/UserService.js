const db = require("../database");

module.exports = {
  findByUsername: (username) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Users WHERE username = ? ", [username], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  login: (username, password) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Users WHERE username = ? AND password = ? ", [username, password], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  register: (username, password, iv) => {
    return new Promise((accept, reject) => {
      db.query("INSERT INTO Users (username, password, iv) values (?, ?, ?)", [username, password, iv], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },
};
