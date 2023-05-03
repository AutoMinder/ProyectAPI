
const {body, param} =require ("express-validator");
const validators = {};

validators.createPostValidator = [
    body("title")
        .notEmpty()
            .withMessage("Title is required"),

    body("marca")
        .notEmpty()
            .withMessage("brand is required"),

    body("modelo")
        .notEmpty()
            .withMessage("model is required"),

    body("year")
        .notEmpty()
            .withMessage("year is required"),
    
    body("nextMaintenance")
        .notEmpty()
            .withMessage("Not null nextMaintenance"),

    body("kilometersDate")
        .notEmpty()
        .withMessage("Not null kilometersDate"),
            
    body("kilometers")
        .notEmpty()
        .withMessage("Not null kilometers"),

    body("lastOilChange")
        .notEmpty()
            .withMessage("Not null lastOilChange"),

    body("lastCoolanChange")
        .notEmpty()
            .withMessage("Not null lastCoolanChange"),
    
    body("tunedMayor")
        .notEmpty()
            .withMessage("Not null tunedMayor"),

    body("tunedMinor")
        .notEmpty()
            .withMessage("Not null tunedMinor"),

            
];

validators.findPostByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier is required")
        .isMongoId().withMessage("Identifier should be a valid Mongo ID"),
]

module.exports = validators;


/*


*/