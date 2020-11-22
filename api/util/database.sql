CREATE TABLE roles(
    id SERIAL PRIMARY KEY NOT NULL,
    nombre VARCHAR(30) NOT NULL
);

-- Tabla usuarios
CREATE TABLE usuarios(
       id SERIAL PRIMARY KEY NOT NULL,
       nombre VARCHAR(100) NOT NULL,
	clave VARCHAR(100) NOT NULL,
	correo VARCHAR NOT NULL,
	edad VARCHAR(3) NOT NULL,
       pais VARCHAR (50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL,
       tipo_identificacion VARCHAR(40) NOT NULL,
       rol int4 NOT NULL,
       FOREIGN KEY(rol) REFERENCES roles(id)
);

-- Tabla productos
CREATE TABLE productos (
	id SERIAL PRIMARY KEY NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(1000) NULL,
	precio INT NOT NULL,
	categoria VARCHAR(100) NULL,
       id_usuario INT NOT NULL,
       imagen VARCHAR(30) NULL,
       FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla ventas
CREATE TABLE ventas(
       id SERIAL PRIMARY KEY NOT NULL,
       id_usuario INT NOT NULL,
       tipo_venta VARCHAR(100) NOT NULL,
       FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla detallesVentas
CREATE TABLE detallesVentas(
       id SERIAL PRIMARY KEY NOT NULL,
       id_producto INT NOT NULL,
       cantidad INT NOT NULL,
       valor_unitario INTEGER NOT NULL,
       id_ventas INT NOT NULL,
       FOREIGN KEY (id_producto) REFERENCES productos(id),
       FOREIGN KEY (id_ventas) REFERENCES ventas(id)
);

-- Tabla entidadBancaria
CREATE TABLE entidadBancaria(
       id SERIAL PRIMARY KEY NOT NULL,
       entidad VARCHAR(100)
);

-- Tabla pagos
CREATE TABLE pagos(
       id SERIAL PRIMARY KEY NOT NULL,
       id_entidad_bancaria INTEGER NOT NULL,
       id_ventas INTEGER NOT NULL,
       FOREIGN KEY (id_entidad_bancaria) REFERENCES entidadBancaria(id),
       FOREIGN KEY (id_ventas) REFERENCES ventas(id)
);