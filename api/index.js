const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/v1", (request, response) => {
    response.send('Hola mundo');
});

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`API running http://localhost:` + PORT);
});