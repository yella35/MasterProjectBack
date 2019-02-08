const Image = require('../../models/images.model').Image
const fs = require('fs')

module.exports.GET = async function (req, res) {

    const id = req.params.id;
    try {
        const image = await Image.findOne({_id: id})
        const file = image.path;

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
