const { validationResult } = require("express-validator");

// Mostrar errores de las validaciones en la respuesta
const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  validateFields,
};
