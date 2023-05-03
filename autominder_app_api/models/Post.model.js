const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const PostSchema = new Schema({ 
    title: {
        type: String,
        trim: true,
        required: true,
    
    },

    marca:{
        type: String,
        trim: true,
        require: true,
    },

    modelo:{
        type: String,
        trim: true,
        require: true,
    },

    year:{
        type: String,
        trim: true,
        require: true,
    },

    nextMaintenance:{
        type: Date,
        trim: true,
        requiere: false
    },

    kilometers:{
        type: Float32Array,
        trim: true,
        requiere: false
    },

    kilometersDate:{
        type: Date,
        trim: true,
        requiere: false
    },

    lastOilChange:{
        type: Date,
        trim: true,
        requiere: false
    },

    lastCoolanChange:{
        type: Date,
        trim: true,
        requiere: false
    },

    tunedMayor:{
        type: Date,
        trim: true,
        requiere: false
    },

    tunedMinor:{
        type: Date,
        trim: true,
        requiere: false
    },

    hidden: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
   
}, { timestamps: true });
// Hora de modificaciones

module.exports = Mongoose.model('Post', PostSchema);