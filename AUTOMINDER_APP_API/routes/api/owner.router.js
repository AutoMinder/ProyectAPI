const Express = require('express');

const router = Express.Router();

const authController = require('../../controllers/auth.controller');

const runValidation = require('../../validators/index.middleware');

const {register} = require('../../validators/auth.validator');

const { authentication } = require("../../middlewares/auth.middlewares");

router.post("/signup",
    register,
    runValidation,
    authController.register
);

router.post("/login", authController.login);

router.get("/whoami", authentication, authController.whoami)

module.exports = router;