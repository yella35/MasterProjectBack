const Location = require('../../models/location.model').Location
const LocationType = require('../../models/locationtype.model').LocationType
const Disponibilite = require('../../models/disponibilite.model').Disponibilite
const fs = require('fs')

module.exports.GETALL = async function (req, res) {
    let idType = req.params.idType
    const limit = req.query.limit ? req.query.limit | 0 : -1;
    const start = req.query.start ? req.query.start | 0 : 0;
    let query = {locationType: idType};
    let options = {
        skip: start,
        sort: {
            last_update_date: -1
        }
    };
    if (limit !== -1) {
        options.limit = limit;
    }
    try {
        let locations = await Location
            .find(query, {}, options).populate('locationType').populate('disponibilites')
        if (!locations) {
            res.status(400)
            return res.send("Can't find locations")
        }
        res.status(200)
        return res.send({locations: locations})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}

module.exports.GET = async function (req, res) {
    let id = req.params.id
    try {
        let location = await Location
            .findById(id).populate('locationType').populate('disponibilites')
        if (!location) {
            res.status(400)
            return res.send("Can't find location")
        }
        res.status(200)
        return res.send({location: location})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}

module.exports.GETTHUMB = async function (req, res) {

    const id = req.params.id;
    try {
        const location = await Location.findOne({_id: id})
        const file = location.thumbnail;

        fs.readFile(file, (err,data) => {
            if (err) {
                console.error(err)
                res.status(500)
                return res.send()
            }
            res.status(200);
            res.end(data);
        });
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }

}
