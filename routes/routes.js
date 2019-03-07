const restify = require('restify')
const CookieParser = require('restify-cookies');
const logger = require('morgan')
const location =  require('./objects/locations')
const locationtypes =  require('./objects/locationtypes')
const image =  require('./objects/images')
const equipement =  require('./objects/equipements')
const auth =  require('./auth')
const user =  require('./objects/user')
const Auth =  require('../authentification/auth').isAuthenticated
const AuthAdmin =  require('../authentification/auth').isAdmin

const httpServer = restify.createServer()
initServer(httpServer)

function initServer (server) {

    server.use(logger('dev'))


    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
        res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
        next()
    })


    server.opts('/.*', (req, res, next) => {
        res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
        res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
        res.send(200)
        return next()
    })


    server.use(restify.plugins.bodyParser())
    server.use(CookieParser.parse)

    server.get(
        {path: '/locations/:idType', version: '1.0.0'},
        location.GETALL
    )

    server.get(
        {path: '/locations/detail/:id', version: '1.0.0'},
        location.GET
    )

    server.get(
        {path: '/locations/:id/thumb', version: '1.0.0'},
        location.GETTHUMB
    )

    server.get(
        {path: '/images/:id', version: '1.0.0'},
        image.GET
    )

    server.get(
        {path: '/locationtypes', version: '1.0.0'},
        locationtypes.GETALL
    )


    server.get(
        {path: '/equipements/:id', version: '1.0.0'},
        equipement.GETALL
    )

    server.post({path: '/login', version: '1.0.0'},
        auth.POST
    )

    server.get({path: '/logout', version: '1.0.0'},
        auth.GETLOGOUT
    )
    server.get({path: '/activeSession', version: '1.0.0'},
        Auth,
        auth.CHECKLOGGEDIN
    )

    // Handle user api
    server.get({path: '/users', version: '1.0.0'},
        user.GETALL
    )

    server.get({path: '/user/:id', version: '1.0.0'},
        user.GET
    )

    server.put({path: '/users', version: '1.0.0'},
        AuthAdmin,
        user.PUT
    )



}

module.exports.httpServer = httpServer