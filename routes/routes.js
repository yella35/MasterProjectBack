const restify = require('restify')
const logger = require('morgan')
const location =  require('./objects/locations')

const httpServer = restify.createServer()
initServer(httpServer)

function initServer (server) {

    server.use(logger('dev'))

    server.use(restify.plugins.bodyParser())

    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        next()
    })
    server.opts('/.*', (req, res, next) => {
        res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
        res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
        res.send(200)
        return next()
    })

    server.get(
        {path: '/locations/:idType', version: '1.0.0'},
        location.GETALL
    )

    server.get(
        {path: '/locations/:id/thumb', version: '1.0.0'},
        location.GETTHUMB
    )



}

module.exports.httpServer = httpServer