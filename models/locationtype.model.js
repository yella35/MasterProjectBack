const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationType = new Schema({
    nom : String,
})

module.exports.LocationType = mongoose.model('LocationType', LocationType)