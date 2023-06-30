const User = require('../models/User.model');

const debug = require('debug')('app:auth-controller');

const controller = {};

const {createToken, verifyToken} = require('../utils/jwt.tools');

const ROLES = require('../data/roles.constants.json');


controller.register = async (req, res) => {
    try{
        const { email, username, password} = req.body;

        const user = await User.findOne({  $or: [ { email:email }, { username:username } ] });

        if(user){
            return res.status(409).json({message: 'User already exists'});
        }

        debug({username, email});

        //Form de encriptar

        const newUser = new User({
            email:email, 
            username:username, 
            password:password,
            roles: [ROLES.USER]
        });


        await newUser.save();


        return res.status(201).json({message: 'User created successfully'});

    }catch(error){
        debug({error});
        return res.status(500).json({message: "Error registering user"});
    }
}

controller.login = async (req, res) => {
    try{
        const {identifier, password} = req.body;
        
        const user = await User.findOne({ $or: [ { username:identifier }, { email:identifier } ] });

        if(!user){
            return res.status(404).json({message: 'User not found'});
        
        }


        if(!user.comparePassword(password)){
            return res.status(401).json({message: 'Invalid credentials'});
        }


        //Loggear al usuario
        const token = createToken(user._id);

        user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0,4)];


        await user.save();



        //Registrar en la base los tokens

        return res.status(200).json({token: token});


    }catch(error){
        debug({error});
        return res.status(500).json({message: "Error logging in user"});
    }
}

controller.whoami = async (req, res) => {
    try {
        
        const { _id, username, email, roles} = req.user;

        return res.status(200).json( { _id, username, email, roles} );
    } catch (error) {
        debug({error});
        return res.status(500).json({message: "Error in WhoAmI function"});
    }
}


controller.findAllUsers = async (req, res) => {
    try{
        const users = await User.find({roles: ROLES.ADMIN});

        return res.status(200).json({users});

    }catch(error){
        debug({error});
        return res.status(500).json({message: "Error getting all users"});
    }
};

controller.findAllUsersU = async (req, res) => {
    try{
        const users = await User.find({roles : ROLES.USER});

        return res.status(200).json({users});

    }catch(error){
        debug({error});
        return res.status(500).json({message: "Error getting all users"});
    }
};

controller.toggleUserRoles = async (req, res) => {
    try {
        const { identifier: userID } = req.params;

        const user = await User.findOne({ _id: userID });

        if(!user)
        {
            return res.status(404).json({ error: "Usuario no encontrado "});
        }

        if(user.roles == "admin"){
            user.roles = "user";
        }else{
            user.roles = "admin";
        }

        await user.save();

        return res.status(200).json({ message: "Usuario actualizado exitosamente!" });

    } catch (error) {
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor(toggleUserRoles)' });
    }
};


module.exports = controller;