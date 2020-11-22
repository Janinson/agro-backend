require("./config");
const express = require("express");
const rutas = require("./routes/rutas");
const fileUpload = require("express-fileupload");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());


app.use(rutas);

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`API running http://localhost:` + PORT);
});