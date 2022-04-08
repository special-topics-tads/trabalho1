const express = require('express');
const app = express();
const router = require('./routes/router');
const mongoose = require("mongoose");
const port = 3000;

try {
  mongoose.connect("mongodb://localhost:27017/car", {
    userNewUrlParse: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log("Erro de conexão com MongoDB.");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log('Server running at port: ' + process.env.SYSTEM_PORT);
});

module.exports = app;
