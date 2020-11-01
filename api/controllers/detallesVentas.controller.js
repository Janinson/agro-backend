const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const metodos = {
  async obtenerDetallesVentas(request, response) {
    try {
      const sql = "SELECT * FROM detallesventas";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Detalles de la ventas, esta funcionando";
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

  async guardarDetallesVentas(request, response) {
    try {
      let sql = "INSERT INTO public.detallesventas (id, id_producto, cantidad, valor_unitario, id_ventas)";
      sql += "VALUES($1, $2, $3, $4, $5);"
      let body = request.body;
      let values = [
      body.id,
      body.id_producto,
      body.cantidad,
      body.valor_unitario,
      body.id_ventas
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "El detalle de esta venta se ha realizado con exito!";
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

  async eliminarDetallesVentas(request, response) {
    try {
      const sql = "DELETE FROM detallesventas WHERE id=$1";
      let id = request.params.id;
      let responseDB = await _servicePg.execute(sql, [id]);
      let rowCount = responseDB.rowCount;
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Se ha sido eliminado el detalle de la venta con exito";
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

  async actualizarDetallesVentas(request, response) {
    try {
      let id = request.params.id;
      let sql =
      "UPDATE public.detallesventas SET id_producto=$1, cantidad=$2, valor_unitario=$3, id_ventas=$4 WHERE id=$5;"
      let body = request.body;
      let values = [
        body.id_entidad_bancaria,
        body.id_ventas,
        id
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Detalle de la venta se ha actualizado con exito";
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