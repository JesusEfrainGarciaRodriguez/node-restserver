const { response, request } = require("express");
const bcrypt = require("bcrypt");


const User = require("../models/user");

const usuariosGet = (req = request, res = response) => {
  const { q, page = 1, limit = 10 } = req.query;

  res.json({
    message: "Get - controlador",
    q,
    page,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  res.status(201).json({
    body: user,
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    message: "Put - controlador",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    message: "Patch - controlador",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    message: "Delete - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
