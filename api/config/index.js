process.env.NODE_ENV = process.env.NODE_ENV || "dev";

console.log("Enviroment", process.env.NODE_ENV);

if (process.env.NODE_ENV == "dev") {
  process.env.USER_DB = "postgres";
  process.env.HOST_DB = "localhost";
  process.env.DB = "agro";
  process.env.PASSWORD_DB = "0721";
  process.env.PORT_DB = 5432;
} else if (process.env.NODE_ENV == "production") {
  process.env.USER_DB = "";
  process.env.HOST_DB = "";
  process.env.DB = "";
  process.env.PASSWORD_DB = "";
  process.env.PORT_DB = 5432;
}