const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Disponibilite = new Schema({
    location : {type: Schema.Types.ObjectId, ref: 'Location'},
    prix :[{
        date: Date,
        montant: Number
    }
    ]
})

module.exports.Disponibilite = mongoose.model('Disponibilite', Disponibilite)