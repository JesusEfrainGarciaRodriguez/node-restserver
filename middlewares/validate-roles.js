const { response, request } = require("express");

// Verificar que el usuario sea administrador
const isAdmineRole = (req = request, res = response, next) => {
  // De no existir el usuario autenticado en la request
  if (!req.userAuth) {
    return res.status(500).json({
      message: "Se quiere verificar el role sin validar el token primero",
    });
  }

  // Extraer rol y nombre del usuario autenticado
  const { role, name } = req.userAuth;

  // Verificar que el usuario sea adminstrador
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: `${name} no es administrador`,
    });
  }

  next();
};

// Verificar si el usuario autenticado tiene alguno de los roles proporcionados
const isRole = (...roles) => {
  return (req = request, res = response, next) => {
    // De no existir el usuario autenticado en la request
    if (!req.userAuth) {
      return res.status(500).json({
        message: "Se quiere verificar el role sin validar el token primero",
      });
    }

    // Verificar si el usuario autenticado tiene algunos de los roles proporcionados
    if (!roles.includes(req.userAuth.role)) {
      return res.status(401).json({
        message: `El servio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdmineRole,
  isRole,
};
