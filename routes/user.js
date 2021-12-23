const { Router } = require("express");
const { check } = require("express-validator");

const { isRoleValid } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

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
    check("password", "La contraseña debe tener más de 6 letras").isLength({
      min: 6,
    }),
    /* check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.patch("/", usuariosPatch);

router.delete("/", usuariosDelete);

module.exports = router;
