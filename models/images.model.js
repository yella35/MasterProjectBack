const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema({
    nom: String,
    path: String
})

module.exports.Image = mongoose.model('Image', Image)