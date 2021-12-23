const Role = require("../models/role");
const User = require("../models/user");

// Verificar si el rol esta registrado en la BD
const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) {
    // Este error es recogido en validationResult(req)
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

// Verificar si el correo existe
const existsEmail = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    // Este error es recogido en validationResult(req)
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

// Verificar si el correo existe
const existsUserById = async (id) => {
  const exists = await User.findById(id);

  if (!exists) {
    // Este error es recogido en validationResult(req)
    throw new Error(`El id no existe: ${id}`);
  }
};

module.exports = {
  isRoleValid,
  existsEmail,
  existsUserById,
};
