const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const metodos = {
  async obtenerProductos(request, response) {
    try {
      const sql = "SELECT * FROM productos ";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;
      
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Productos, esta funcionando";
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
  },

  async guardarProductos(request, response) {
    try {
      let sql =
      "INSERT INTO public.productos (id, nombre, descripcion, precio, categoria, id_usuario)";
      sql += "VALUES($1, $2, $3, $4, $5, $6);";
      let body = request.body;
      let values = [
      body.id,
      body.nombre,
      body.descripcion,
      body.precio,
      body.categoria,
      body.id_usuario
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "El producto se ha creado con exito!";
      responseJSON.info = body;
      response.status(201).send(responseJSON);
    } catch (error) {
      console.log(error);
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error el servidor no pudo interpretar la solicitud.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },

  async eliminarProductos (request, response) {
    try {
      const sql = "DELETE FROM productos WHERE id=$1";
      let id = request.params.id;
      let responseDB = await _servicePg.execute(sql, [id]);
      let rowCount = responseDB.rowCount;
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "El prodcuto ha sido eliminado con exito";
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
  },

  async actualizarProductos (request, response) {
    try {
      let id = request.params.id;
      let sql =
      "UPDATE public.productos SET nombre=$1, descripcion=$2, precio=$3, categoria=$4, id_usuario=$5 WHERE id=$6;"
      let body = request.body;
      let values = [
        body.nombre,
        body.descripcion,
        body.precio,
        body.categoria,
        body.id_usuario,
        id
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Producto actualizado con exito";
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
}

module.exports = metodos;