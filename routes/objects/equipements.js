const Equipement = require('../../models/equipements.model').Equipement

module.exports.GETALL = async function (req, res) {
    try {
        let equipements = await Equipement
            .find()
        if (!equipements) {
            res.status(400)
            return res.send("Can't find equipements")
        }
        res.status(200)
        return res.send({equipements: equipements})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}

module.exports.GETALL = async function (req, res) {
    try {
        let equipements = await Equipement
            .find()
        if (!equipements) {
            res.status(400)
            return res.send("Can't find equipements")
        }
        res.status(200)
        return res.send({equipements: equipements})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}

