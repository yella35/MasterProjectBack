const mongoose = require('mongoose')
const Option = mongoose.Schema

const Option = new Schema({
    nom : String,
    icon : String,
    
})

module.exports.Option = mongoose.model('Option', Option)