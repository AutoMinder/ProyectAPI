const jwt = require('jsonwebtoken');

//Variables a utilizar

const secret = process.env.TOKEN_SECRET || 'secret';

const expiration = process.env.TOKEN_EXP || '15m';


const tools = {};


tools.createToken = (_id) => {
    
    return jwt.sign({ userId: _id }, secret, { expiresIn: expiration });


}


tools.verifyToken = (token) => {
    try{

        return jwt.verify(token, secret);

    }catch(error){

        return false;

    }
}

module.exports = tools;