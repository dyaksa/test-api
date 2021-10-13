const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Visitor = new Schema({
    name: {
        type: String,
        required: true
    },
    ktp_id: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
    date_of_birth: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    images_path: {
        type: String,
        required: false,
        default: null
    }
})

module.exports = mongoose.model('Visitor', )