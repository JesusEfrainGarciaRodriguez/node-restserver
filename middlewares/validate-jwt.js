const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Validar que se envía un token y este sea válido
const validateJWT = async (req = request, res = response, next) => {
  // Guardar el token mandado
  const token = req.header("x-token");

  // Verificar si el token fue mandado
  if (!token) {
    return res.status(401).json({
      message: "No hay token en la petición",
    });
  }

  try {
    // Verificar el token
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    // Leer el usuario que corresponde el uid
    const userAuth = await User.findById(uid);

    // Verificar si existe el usuario autenticado
    if(!userAuth) {
      return res.status(401).json({
        message: "Token no válido - usuario usuario no existe en BD",
      });
    }

    // Verificar si el usuario autenticado tiene el status en true
    if (!userAuth.status) {
      return res.status(401).json({
        message: "Token no válido - usuario con status: false",
      });
    }

    // Establecer en la request
    req.userAuth = userAuth;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
