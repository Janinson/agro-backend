const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const obtenerUsuarios = async (request, response) => {
  const sql = "SELECT * FROM usuarios*"
  let responseDB = await _servicePg.execute(sql);
  let rowCount = responseDB.rowCount;
  let rows = responseDB.rows;

  rows = rows.map((x) => {
    delete x.clave;
    return x;
  });

  let responseJSON = {};
  responseJSON.ok = true;
  responseJSON.message = "Usuarios, esta funcionando";
  responseJSON.info = rows;
  responseJSON.metainfo = { total: rowCount };
  response.send(responseJSON);
};

const guardarUsuario = async (request, response) => {
  try {
    let sql = "INSERT INTO public.usuarios (id, nombre, clave, correo, edad, pais, ciudad, tipo_identificacion, identificacion, tipo_usuario)";
    sql += "VALUES($1, $2, md5($3), $4, $5, $6, $7, $8, $9, $10);";
    let body = request.body;
    let values = [
      body.id,
      body.nombre,
      body.clave,
      body.correo,
      body.edad,
      body.pais,
      body.ciudad,
      body.tipo_identificacion,
      body.identificacion,
      body.tipo_usuario
    ];
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Se ha creado el usuario con exito";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error el servidor no pudo interpretar la solicitud.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const actualizarUsuario = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.usuarios SET nombre=$1, correo=$2, edad=$3, pais=$4, ciudad=$5, tipo_identificacion=$6, identificacion=$7, tipo_usuario=$8 WHERE id=$9;"
    let body = request.body;
    let values = [
      body.nombre,
      body.correo,
      body.edad,
      body.pais,
      body.ciudad,
      body.tipo_identificacion,
      body.identificacion,
      body.tipo_usuario,
      id
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Usuario actualizado con exito";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error el servidor no pudo interpretar la solicitud.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  } 
}

/**
 * 
 * @param {Request} request 
 * @param {Response} response 
 */

const eliminarUsuario = async (request, response) => {
  try {
    const sql = "DELETE FROM usuarios WHERE id=$1";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Se ha eliminado el usuario con exito.";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error el servidor no pudo interpretar la solicitud.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
    
module.exports = { obtenerUsuarios, guardarUsuario, actualizarUsuario, eliminarUsuario };