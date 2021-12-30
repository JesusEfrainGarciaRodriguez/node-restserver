const { response, request } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  // Ejecutar a la vez las promesas
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    message: "Get - controlador",
    total,
    data: users,
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
    message: "User added successfully",
    data: user,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  // Valdiar contra base de datos
  if (password) {
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    message: "User updated successfully",
    data: user,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    message: "Patch - controlador",
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  // Borrado fisico
  /* const usuario = await User.findByIdAndDelete(id); */

  // Borrado logico
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    message: "User deleted successfully",
    data: user,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
