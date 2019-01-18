const httpServer = require('./routes/routes').httpServer
const mongoose = require('mongoose')
const Globals = require('./config/globals')


function initMongo (user, password, host) {
    return new Promise((resolve, reject) => {
       mongoose.connect(`mongodb://${host || 'localhost'}/hotellerie`, { useNewUrlParser: true })
        const db = mongoose.connection
        db.on('error', reject)
        db.once('open', resolve)
    })
}

function initHTTPServer () {
    console.log(Globals.PORT)
    return new Promise((resolve, reject) => {
        httpServer.listen(Globals.PORT, (err) => {
            console.log(`Server launch on port ${Globals.PORT}`)
            if (err) return reject(err)
            resolve()
        })
    })
}

/**
 * Launching the whole process
 */
async function init () {
    await initMongo(process.env.MONGO_USER, process.env.MONGO_PWD, process.env.MONGO_HOST)
    await initHTTPServer()
}

init()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })