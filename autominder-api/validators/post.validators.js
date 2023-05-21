
const {body, param} =require ("express-validator");
const validators = {};

validators.createPostValidator = [
    body("vin"),
    body("car_name")
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
    body("kilometers")
        .notEmpty()
            .withMessage("Not null kilometers"),
    body("kilometersDate")
        .notEmpty()
            .withMessage("Not null kilometersDate"),



    body("nextMaintenance"),
    body("lastOilChange"),
    body("lastCoolantChange"),
    body("mayorTuning"),
    body("minorTuning"),
    body("errorRecord"),
];

validators.findPostByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier is required")
        .isMongoId().withMessage("Identifier should be a valid Mongo ID"),
]

module.exports = validators;