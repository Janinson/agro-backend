require("./config");
const express = require("express");
const rutas = require("./routes/rutas");

const app = express();
app.use(express.json());

app.use(rutas);

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`API running http://localhost:` + PORT);
});