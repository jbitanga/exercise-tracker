const mongoose = require('mongoose');
//Required to connect to DB

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true, //Automatically create fields for creation/modified
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;