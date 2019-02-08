const LocationType = require('../../models/locationtype.model').LocationType



module.exports.GETALL = async function (req, res) {
    try {
        let locationtypes = await LocationType
            .find()
        if (!locationtypes) {
            res.status(400)
            return res.send("Can't find locations")
        }
        res.status(200)
        return res.send({locationtypes: locationtypes})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}

