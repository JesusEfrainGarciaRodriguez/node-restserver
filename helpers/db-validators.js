const Role = require("../models/role");

const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

module.exports = {
    isRoleValid
}