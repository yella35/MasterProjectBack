const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Location = new Schema({
    nom : String,
    locationType:  [{type: Schema.Types.ObjectId, ref: 'LocationType'}],
    thumbnail : String,
    adresse:{
        ville : String,
        codePostal : String,
        rue : String
    },
    disponibilites: {type: Schema.Types.ObjectId, ref: 'Disponibilite'},
    commentaires: [{type: Schema.Types.ObjectId, ref: 'Commentaire'}],
    reservations: {type: Schema.Types.ObjectId, ref: 'Reservation'},
    options: [{type: Schema.Types.ObjectId, ref: 'Option'}],
})

module.exports.Location = mongoose.model('Location', Location)