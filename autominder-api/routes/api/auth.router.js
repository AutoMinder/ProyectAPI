const Express = require('express');

const ROLES = require("../../data/roles.constants.json");

const router = Express.Router();

const authController = require('../../controllers/auth.controller');

const runValidation = require('../../validators/index.middleware');

const {register} = require('../../validators/auth.validator');

const { authentication, authorization } = require("../../middlewares/auth.middlewares");

router.post("/signup",
    register,
    runValidation,
    authController.register
);

router.post("/signin", authController.login);

router.get("/whoami", authentication, authController.whoami);

router.get("/allusers", authController.findAllUsers);

router.get("/allusersu", authController.findAllUsersU);



router.patch("/updateusers/:identifier", authentication, 
                                        authorization(ROLES.SYS_ADMIN, ROLES.ADMIN),
                                        authController.toggleUserRoles);

module.exports = router;