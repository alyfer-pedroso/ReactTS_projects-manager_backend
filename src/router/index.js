const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(403);

  const expectedToken = process.env.TOKEN;
  if (token !== expectedToken) return res.sendStatus(403);

  next();
};

//#region USER

//#region POST
router.post("/users/register", authToken, UserController.register);
router.post("/users/login", authToken, UserController.login);
//#endregion POST

//#endregion USER

module.exports = router;
