const Chambre = require('../models/chambre.model.js').Chambre

module.exports.GETALL = function (req, res) {
    const limit = req.query.limit ? req.query.limit | 0 : -1;
    const start = req.query.start ? req.query.start | 0 : 0;
    let chambres = Chambre.find({})
    let query = {};
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
        let chambres = await
        Chambre
            .find(query, {}, options)
        if (!chambres) {
            res.status(400)
            return res.send("Can't find chambre")
        }
        res.status(200)
        return res.send({chambres : chambres})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send()
    }
}
