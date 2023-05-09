//  LIBRARY IMPORTATION
const express = require("express");

const router = express.Router();

//  Importando todos los enrutadores secundarios de la carpeta API
const carRouter = require("./car.router");
const ownerRouter = require("./owner.router");

//Definir las rutas
router.use("/car", carRouter);
router.use("/owner", ownerRouter);

//  MODULE EXPORTATION
module.exports = router;