const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chambre = new Schema({
    nom: String,
    lieu: String,
    prix: {type: Schema.Types.ObjectId, ref: 'Calendrier'},
    image: String,
    commentaire: [{type: Schema.Types.ObjectId, ref: 'Commentaire'}],
    reservation: {type: Schema.Types.ObjectId, ref: 'Reservation'},
    option: [{type: Schema.Types.ObjectId, ref: 'Option'}],
    disponibilite: [{type: Schema.Types.ObjectId, ref: 'Disponibilite'}],
})
module.exports.Project = mongoose.model('Chambre', Chambre)