const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const PostSchema = new Schema(
{ 
    id:{
        type: String,
        trim: true,
        required: false
    },
    vin:{
        type: String,
        trim: true,
        required: false
    },

    car_name: {
        type: String,
        trim: true,
        required: true,
    },

    brand:{
        type: String,
        trim: true,
        require: true,
    },

    model:{
        type: String,
        trim: true,
        require: true,
    },

    year:{
        type: String,
        trim: true,
        require: true,
    },

    kilometers:{
        type: String,
        trim: true,
        requiere: true
    },


    /////



    lastMaintenance:{
        type: String,
        trim: true, 
        requiere: false
    },

    mayorTuning:{
        type: String,
        trim: true,
        requiere: false
    },

    minorTuning:{
        type: String,
        trim: true,
        requiere: false
    },


    lastOilChange:{
        type: String,
        trim: true,
        requiere: false
    },



    lastCoolantChange:{
        type: String,
        trim: true,
        requiere: false
    },
   

    errorRecord:{
        type: [String],
        default: [],
        requiere: false

    },
    
    ///////



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