const crypto = require('crypto')
const jwt = require('jwt-simple')
const User = require('../models/user.model').User

/**
 * User Login Module
 * @param req
 * @param res
 * @constructor
 */
module.exports.POST = async function (req, res) {
    if (!req.body.username && !req.body.password) {
        res.status(404)
        return res.send('Empty elements')
    }
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await User.findOne({'username': username.toLowerCase()})
        if (!user) {
            res.status(404)
            return res.send('User Not Found with username ' + username)
        }
        if (!user.salt) {
            res.status(404)
            return res.send('User password not encrypted ' + username)
        }
        const salt = user.salt
        const testHash = sha512(password, salt)
        if (user.password === testHash.passwordHash) {
            const payloadToken = {user: user._id, date: new Date()}
            const tokenSID = jwt.encode(payloadToken, process.env.secretJWT)
            res.setCookie('SID', tokenSID)
            return res.send(200)
        }
        console.log('Invalid password')
        res.status(404)
        return res.send('Invalid password')
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports.GETLOGOUT = async function (req, res,next) {
    res.clearCookie('SID')
    return res.send(200,'ok')
}

module.exports.CHECKLOGGEDIN = async function (req, res) {
    return res.send(200,req.cookies)
}

const sha512 = function (password, salt) {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
        salt: salt,
        passwordHash: value
    }
}