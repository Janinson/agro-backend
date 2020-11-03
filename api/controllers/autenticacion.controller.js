const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const jwt = require("../services/jwt.js");

const inicioSesion = async (request, response) => {
  let responseJSON = {};
  responseJSON.ok = true;
  try {
    const sql =
    "SELECT nombre, correo, tipo_usuario FROM usuarios where id = $1 and clave = md5($2)";
    let body = request.body;
    let values = [body.id, body.clave];
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    if (rowCount == 1) {
      let user = responseDB.rows[0];
      responseJSON.message = "Usuario esta funcionando";
      responseJSON.info = jwt.crearToken(user);
      response.send(responseJSON);
    } else {
      responseJSON.message = "El usuario no ha sido encontrado (Verifique id, clave)";
      responseJSON.info = [];
      response.send(responseJSON);
    }
  } catch (error) {
    console.log(error);
    responseJSON.ok = false;
    responseJSON.message = "Error.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const validarToken = (request, response) => {
  let responseJSON = {};
  responseJSON.ok = true;
  try {
    let headers = request.headers.authorization.split(" ");
    let token = headers[1];
    responseJSON.message = "Usuarios, esta bien";
    responseJSON.info = jwt.validarToken(token);
    response.send(responseJSON);
  } catch (error) {
    responseJSON.ok = false;
    responseJSON.message = "Error mientras se valida el token.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { inicioSesion, validarToken };