const { response, request } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Usuario / Contraseña no son correctos - correo",
      });
    }

    // Si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        message: "Usuario / Contraseña no son correctos - status: false",
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Usuario / Contraseña no son correctos - contraseña",
      });
    }

    // Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      message: "Logueado correctamente",
      data: user,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

module.exports = {
  login,
};
