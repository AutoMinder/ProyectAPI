
const {body, param} =require ("express-validator");
const validators = {};

validators.createPostValidator = [
body("vin")
        .withMessage("vin is required"),
body("carn_name")
    .notEmpty()
        .withMessage("car_name is required"),
body("brand")
    .notEmpty()
        .withMessage("brand is required"),
body("model")
    .notEmpty()
        .withMessage("model is required"),
body("year")
    .notEmpty()
        .withMessage("year is required"),
body("kilometer")
    .notEmpty()
        .withMessage("Not null kilometers"),
body("kilometersDate")
    .notEmpty()
    .withMessage("Not null kilometersDate"),



body("nextMaintenance")
    .withMessage("Not null nextMaintenance"),
body("lastOilChange")
    .withMessage("Not null lastOilChange"),
body("lastCoolantChange")
    .withMessage("Not null lastCoolanChange"),
body("mayorTuning")
    .withMessage("Not null tunedMayor"),
body("minorTuning")
    .withMessage("Not null tunedMinor"),
body("errorRecord")
    .withMessage("Not null errorRecord"),
];

validators.findPostByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier is required")
        .isMongoId().withMessage("Identifier should be a valid Mongo ID"),
]

module.exports = validators;