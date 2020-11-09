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
    responseJSON.message = "Usuarios, esta bien";
    responseJSON.info = descifrarToken(request);
    response.send(responseJSON);
  } catch (error) {
    responseJSON.ok = false;
    responseJSON.message = "Error mientras se valida el token.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * 
 * @param {Request} request 
 * @param {Response} response 
 * @param {*} next 
 */
const middleware = (request, response, next) => {
  try {
    console.log(request.url);
    let token = descifrarToken(request);
    request._token = token;
    next();
  } catch (error) {
    let responseJSON = {}
    responseJSON.ok = false;
    responseJSON.message = "Error mientras se valida el middleware.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const descifrarToken = (request) => {
  let headers = request.headers.authorization.split(" ");
  let token = headers[1];
  return jwt.validarToken(token);
}

const noEncontrado = (request, response) => {
  let responseJSON = {};
  responseJSON.ok = false;
  responseJSON.message = "Error, endpoint no se encuentra";
  responseJSON.info = request.url;
  response.status(404).send(responseJSON);
};

module.exports = { inicioSesion, validarToken, middleware, noEncontrado};