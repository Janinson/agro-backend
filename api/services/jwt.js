const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = {
  crearToken(user) {
    let privateKey = fs.readFileSync("api/config/private.key").toString();
    return jwt.sign(user, privateKey, { expiresIn: "1h" });
  },
  validarToken(token) {
    let privateKey = fs.readFileSync("api/config/private.key").toString();
    return jwt.verify(token, privateKey);
  },
};