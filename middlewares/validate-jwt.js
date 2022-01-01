const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req = request, res = response, next) => {
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
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      message: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
