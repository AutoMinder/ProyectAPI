const express = require("express");

const router = express.Router();


//importando todos los enrutas de la carpeta api

const postRouter = require("./post.router");

const authRouter = require("./auth.router");

//Definir las rutas

router.use("/auth", authRouter);
router.use("/post", postRouter);


module.exports = router;