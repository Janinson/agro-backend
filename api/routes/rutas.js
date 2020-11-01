const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios.controller");
const productosController = require("../controllers/productos.controller");
const ventasController = require("../controllers/ventas.controller");
const pagosController = require("../controllers/pagos.controller");
const detallesVentasController = require("../controllers/detallesVentas.controller");
const entidadBancariaController = require("../controllers/entidadBancaria.controller");

router
  .get("/api/v1/usuarios", usuariosController.obtenerUsuarios)
  .post("/api/v1/usuarios", usuariosController.guardarUsuario)
  .put("/api/v1/usuarios/:id", usuariosController.actualizarUsuario)
  .delete("/api/v1/usuarios/:id", usuariosController.eliminarUsuario)

  .get("/api/v1/productos", productosController.obtenerProductos)
  .post("/api/v1/productos", productosController.guardarProductos)
  .put("/api/v1/productos/:id", productosController.actualizarProductos)
  .delete("/api/v1/productos/:id", productosController.eliminarProductos)

  .get("/api/v1/ventas", ventasController.obtenerVentas)
  .post("/api/v1/ventas", ventasController.guardarVentas)
  .put("/api/v1/ventas/:id", ventasController.actualizarVentas)
  .delete("/api/v1/ventas/:id", ventasController.eliminarVentas)
  
  .get("/api/v1/pagos", pagosController.obtenerPagos)
  .post("/api/v1/pagos", pagosController.guardarPagos)
  .put("/api/v1/pagos/:id", pagosController.actualizarPagos)
  .delete("/api/v1/pagos/:id", pagosController.eliminarPagos)

  .get("/api/v1/detalle", detallesVentasController.obtenerDetallesVentas)
  .post("/api/v1/detalle", detallesVentasController.guardarDetallesVentas)
  .put("/api/v1/detalle/:id", detallesVentasController.actualizarDetallesVentas)
  .delete("/api/v1/detalle/:id", detallesVentasController.eliminarDetallesVentas)

  .get("/api/v1/entidad", entidadBancariaController.obtenerEntidadBancaria)
  .post("/api/v1/entidad", entidadBancariaController.guardarEntidadBancaria)
  .put("/api/v1/entidad/:id", entidadBancariaController.actualizarEntidadBancaria)
  .delete("/api/v1/entidad/:id", entidadBancariaController.eliminarEntidadBancaria)

module.exports = router;