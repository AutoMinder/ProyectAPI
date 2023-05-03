const {validationResult } = require ("express-validator");

module.exports = (req, res, next) => {
    // Validar los parametros (generico)

    const errors = validationResult(req);

    // Verifiacamos si hay error
    if(!errors.isEmpty()){
        // Si hay error, retornamos el error
        return res.status(400).json({ errors: errors.array().map(error => ({
            field: error.param,
            message: error.msg,
        }))
        });
    }

    // Paso al siguiente middleware
    next();
}