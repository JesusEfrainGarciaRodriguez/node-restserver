const Role = require("../models/role");
const User = require("../models/user");

// Verificar si el rol esta registrado en la BD
const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

// Verificar si el correo existe
const existsEmail = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

module.exports = {
  isRoleValid,
  existsEmail,
};
