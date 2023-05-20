const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const MaintenanceSchema = new Schema(
    {        
        nextMaintenance:{
            type: Date,
            trim: true, 
            requiere: false
        },

        lastOilChange:{
            type: Date,
            trim: true,
            requiere: false
        },

        lastCoolantChange:{
            type: Date,
            trim: true,
            requiere: false
        },

        mayorTuning:{
            type: Date,
            trim: true,
            requiere: false
        },

        minorTuning:{
            type: Date,
            trim: true,
            requiere: false
        },

        errorRecord:{
            type: [String],
            default: []

        },

        carMaintenanceInfo: {
            type: Schema.Types.ObjectId,
            ref: "Car",
            required: true
        },

        hidden: {
            type: Boolean,
            default: false,
        }
        
    }, { timestamps: true });
// Hora de modificaciones

module.exports = Mongoose.model('Maintenance', MaintenanceSchema);