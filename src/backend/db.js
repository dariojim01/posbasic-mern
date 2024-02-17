require("dotenv").config({ path: __dirname + "/.env" });

var mongoose = require("mongoose");
const mongoURL = 'mongodb://localhost:27017/demo1';
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
  console.log('Conexion Mongo exitosa'))
  .catch(err =>
    console.error('No se pudo establecer conexión', err));

mongoose.set('debug', true);
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});