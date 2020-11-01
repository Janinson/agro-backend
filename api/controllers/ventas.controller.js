const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const metodos = {
  async obtenerVentas(request, response) {
    try {
      const sql = "SELECT * FROM ventas ";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;
      
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Ventas, esta funcionando";
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

  async guardarVentas(request, response) {
    try {
      let sql =   
      "INSERT INTO public.ventas (id, id_usuario, tipo_venta)";
      sql += "VALUES($1, $2, $3);"
      let body = request.body;
      let values = [
      body.id,
      body.id_usuario,
      body.tipo_venta
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "La venta se ha creado con exito!";
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

  async eliminarVentas(request, response) {
    try {
      const sql = "DELETE FROM ventas WHERE id=$1";
      let id = request.params.id;
      let responseDB = await _servicePg.execute(sql, [id]);
      let rowCount = responseDB.rowCount;
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "La venta ha sido eliminada con exito";
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

  async actualizarVentas(request, response) {
    try {
      let id = request.params.id;
      let sql = "UPDATE public.ventas SET id_usuario=$1, tipo_venta=$2 WHERE id=$3;"
      let body = request.body;
      let values = [
        body.id_usuario,
        body.tipo_venta,
        id
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Venta se ha actualizado con exito";
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