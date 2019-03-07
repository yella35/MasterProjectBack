const Option = require('../../models/options.model').Option

module.exports.GETALL = async function (req, res) {
    try {
        let options = await Options
            .find()
        if (!options) {
            res.status(400)
            return res.send("Can't find locations")
        }
        res.status(200)
        return res.send({options: options})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}

