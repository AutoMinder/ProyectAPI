const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const PostSchema = new Schema(
{ 
    brand:{
        type: String,
        trim: true,
        require: true,
    },

    model:{
        type: [String],
        default: [],
        requiere: false
    },
}, { timestamps: true });
// Hora de modificaciones

module.exports = Mongoose.model('Brand', PostSchema);