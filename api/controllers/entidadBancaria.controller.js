const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const metodos = {
  async obtenerEntidadBancaria(request, response) {
    try {
      const sql = "SELECT * FROM entidadbancaria ";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;
      
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Entidad bancaria, esta funcionando";
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

  async guardarEntidadBancaria(request, response) {
    try {
      let sql = "INSERT INTO public.entidadbancaria (id, entidad)";
      sql += "VALUES($1, $2);"
      let body = request.body;
      let values = [
      body.id,
      body.entidad
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "La entidad bancaria se ha guardado con exito!";
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

  async eliminarEntidadBancaria(request, response) {
    try {
      const sql = "DELETE FROM entidadbancaria WHERE id=$1";
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

  async actualizarEntidadBancaria(request, response) {
    try {
      let id = request.params.id;
      let sql =
      "UPDATE public.entidadbancaria SET entidad=$1 WHERE id=$2;"
      let body = request.body;
      let values = [
        body.entidad,
        id
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "La entidad bancaria se ha actualizado con exito";
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