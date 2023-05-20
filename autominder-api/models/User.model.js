const Mongoose = require('mongoose');

const debug = require('debug')('app:user-model');

const crypto = require('crypto');



const Schema = Mongoose.Schema;

//Se debe tomar en cuenta los elementos que se desea

// Para este caso email. user y password

//Puede ser un rol de igual forma

//Los post que este publica, por ejemplo

const UserSchema = new Schema({
    email: { type: String, required: true, trim: true, unique: true },

    username: { type: String, required: true, trim: true, unique: true },

    description: { type: String, trim: true, default: "Descripción no definida por el usuario."},

    hashedpassword: { type: String, required: true},

    salt:{ type: String},

    tokens: {
        type: [String],
        default: []
    },

    roles: {
        type: [String],
        default: []
    },

    savedPosts: {
        type: [Schema.Types.ObjectId],
        ref: "Post",
        default: []
    }


}, {timestamps: true});

UserSchema.methods = {
    encryptPassword: function(password){
        if(!password) return "";

        try{
            const encryptedPassword = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64,
                'sha512'

            ).toString('hex');

            return encryptedPassword;

        }catch(error){
            debug({error});
            return "";

        }
    },

    makeSalt: function(){
        return crypto.randomBytes(16).toString('hex');
    },

    comparePassword : function(password){
        return this.hashedpassword === this.encryptPassword(password);
    }
    
}

UserSchema.virtual('password')
    .set(function(password = crypto.randomBytes(16).toString()){
        if(!password) return "";

        this.salt = this.makeSalt();
        this.hashedpassword = this.encryptPassword(password);
    })
module.exports = Mongoose.model('User', UserSchema);