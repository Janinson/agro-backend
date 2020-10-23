const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router
  .get("/api/v1/users", userController.getUsers)
  .post("/api/v1/users", userController.saveUser)
  .put("/api/v1/users/:id", userController.updateUser)
  .delete("/api/v1/users/:id", userController.deleteUser)
  
module.exports = router;