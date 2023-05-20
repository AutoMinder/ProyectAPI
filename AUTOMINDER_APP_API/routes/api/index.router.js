//  LIBRARY IMPORTATION
const express = require("express");

const router = express.Router();

//  Importando todos los enrutadores secundarios de la carpeta API
const carRouter = require("./car.router");
const ownerRouter = require("./owner.router");
const maintenanceRouter = require("./maintenance.router");

//Definir las rutas
router.use("/car", carRouter);
router.use("/owner", ownerRouter);
router.use("/maintenance", maintenanceRouter);


//  MODULE EXPORTATION
module.exports = router;