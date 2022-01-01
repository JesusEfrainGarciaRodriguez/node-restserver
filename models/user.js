const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Eliminar password de la respuesta
UserSchema.methods.toJSON = function() {
  const {__v, password, _id, ...user } = this.toObject();
  // Cambiar nombre de _id por uid
  user.uid = _id;
  return user;
}

module.exports = model("User", UserSchema);
