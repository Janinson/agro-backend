const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const metodos = {
  async obtenerPagos(request, response) {
    try {
      const sql = "SELECT * FROM pagos ";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;
      
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Pagos, esta funcionando";
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

  async guardarPagos(request, response) {
    try {
      let sql = "INSERT INTO public.pagos (id, id_entidad_bancaria, id_ventas)";
      sql += "VALUES($1, $2, $3);"
      let body = request.body;
      let values = [
      body.id,
      body.id_entidad_bancaria,
      body.id_ventas
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "El pago se ha realizado con exito!";
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

  async eliminarPagos(request, response) {
    try {
      const sql = "DELETE FROM pagos WHERE id=$1";
      let id = request.params.id;
      let responseDB = await _servicePg.execute(sql, [id]);
      let rowCount = responseDB.rowCount;
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Se ha sido eliminado el pago con exito";
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

  async actualizarPagos(request, response) {
    try {
      let id = request.params.id;
      let sql = "UPDATE public.pagos SET id_entidad_bancaria=$1, id_ventas=$2 WHERE id=$3;"
      let body = request.body;
      let values = [
        body.id_entidad_bancaria,
        body.id_ventas,
        id
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Pago se ha actualizado con exito";
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