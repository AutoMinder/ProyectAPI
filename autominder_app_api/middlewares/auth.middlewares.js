const middlewares = {};
const debug = require("debug")("app:auth-middlewares");

const tokenPre = "Bearer";

const {verifyToken} = require('../utils/jwt.tools');


const User = require('../models/User.model');

const ROLES = require('../data/roles.constants.json');

middlewares.authentication = async (req, res, next) => {
    try{

        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({message: 'Unauthorized'});
        }


        //Prefijo

        const [prefix, token] = authorization.split(" ");

        if(prefix !== tokenPre){
            return res.status(401).json({message: 'Unauthorized'});
        }

        //Verificar token

        if(!token){
            return res.status(401).json({message: 'Unauthorized'});
        }

        //Obtner id de usuario

        const tokenObjet = verifyToken(token);

        if(!tokenObjet){
            return res.status(401).json({message: 'Unauthorized'});
        }

        // debug(tokenObjet);

        const {userId} = tokenObjet;
        debug({userId});




        //Obtener usuario

        const user = await User.findById(userId);


        if(!user){
            return res.status(401).json({message: 'Unauthorized'});
        }

        //Token registrado o no
        
        const isTokenValid = user.tokens.includes(token);

        if(!isTokenValid){
            return res.status(401).json({message: 'Unauthorized'});
        }

        //Asignar usuario a la request

        req.user = user;

        req.token = token;



        next();


    }catch(error){
        return res.status(500).json({message: "Error authenticating user"});
    }
}



middlewares.authorization = (roleRequired=ROLES.SYSADMIN) => {
    return (req, res, next) => {
        try {
            
            const {roles = []} = req.user;

            const roleIndex = roles.findIndex(role => (role === roleRequired || role === ROLES.SYSADMIN));

            if(roleIndex < 0){
                return res.status(403).json({message: 'Forbidden'});
            }

            next();

        } catch (error) {
            debug({error});
            return res.status(500).json({message: "Error authorizing user"});
        }
    }
}


module.exports = middlewares;
