const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Routes
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    // Conectar a base de datos
    this.conectDB();

    // Middlewares
    this.middlewares();

    // Routas
    this.routes();
  }

  async conectDB() {
    await dbConnection();
  }

  middlewares() {
    // Morgan
    this.app.use(morgan('dev'));

    // Cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
