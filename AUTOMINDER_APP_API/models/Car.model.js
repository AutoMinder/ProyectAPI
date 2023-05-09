const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const CarSchema = new Schema(
    { 
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
            requiere: false
        },

        kilometersDate:{
            type: Number,
            trim: true,
            requiere: false
        },

        hidden: {
            type: Boolean,
            default: false,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }, 
    }, { timestamps: true }); // CRUD operations date and time

module.exports = Mongoose.model('Car', CarSchema);