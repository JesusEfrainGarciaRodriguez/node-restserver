const { Router } = require("express");
const { check } = require("express-validator");

const {
  isRoleValid,
  existsEmail,
  existsUserById,
} = require("../helpers/db-validators");

const { validateFields, validateJWT, isRole, isAdmineRole} = require("../middlewares")

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/user");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("email", "El correo no es valido").custom(existsEmail),
    check("password", "La contraseña debe tener más de 6 letras").isLength({
      min: 6,
    }),
    /* check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("role").custom(isRoleValid),
    // Mostrar errores
    validateFields,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    check("role").custom(isRoleValid),
    // Mostrar errores
    validateFields,
  ],
  usuariosPut
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    validateJWT,
    /* isAdmineRole, */
    isRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  usuariosDelete
);

module.exports = router;
