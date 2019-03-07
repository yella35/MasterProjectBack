const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Equipement = new Schema({
    nom : String,
    icon : String,
    
})

module.exports.Equipement = mongoose.model('Equipement', Equipement)