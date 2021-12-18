const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, page = 1, limit = 10 } = req.query;

  res.json({
    message: "Get - controlador",
    q,
    page,
    limit,
  });
};

const usuariosPost = (req = request, res = response) => {
  const body = req.body;

  res.status(201).json({
    message: "Post - controlador",
    body,
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
