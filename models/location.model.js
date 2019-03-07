const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Location = new Schema({
    nom : String,
    description: String,
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
    options: [{option : {type: Schema.Types.ObjectId, ref: 'Option'} , price : Number}],
    equipements : [{type: Schema.Types.ObjectId, ref: 'Equipement'}],
    images:[{
        small:{type: Schema.Types.ObjectId, ref: 'Image'},
        medium:{type: Schema.Types.ObjectId, ref: 'Image'},
        big:{type: Schema.Types.ObjectId, ref: 'Image'},
    }]
})

module.exports.Location = mongoose.model('Location', Location)