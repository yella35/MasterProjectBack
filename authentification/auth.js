const jwt = require('jwt-simple')
const User = require('../models/user.model').User

module.exports.isAuthenticated = async function (req, res, next) {
    if(req.cookies['SID']){
        const token = req.cookies['SID']
        const decoded = jwt.decode(token,process.env.secretJWT)
        if(decoded.user && decoded.date){
            let dateToken = new  Date(decoded.date)
            dateToken.setDate(dateToken.getDate() + 1)
            if(dateToken > new Date()){
                let user = await User.findById({_id : decoded.user })
                if(user) {
                    req.user = user
                    return next()
                }

            }
        }
        res.clearCookie('SID')
    }
    console.log("Not connected")
    return res.send(401);
};

module.exports.isAdmin = async function (req, res, next) {
    if(req.cookies['SID']){
        const token = req.cookies['SID']
        const decoded = jwt.decode(token,process.env.secretJWT)
        if(decoded.user && decoded.date){
            let dateToken = new  Date(decoded.date)
            dateToken.setDate(dateToken.getDate() + 1)
            if(dateToken > new Date()){
                let user = await User.findById({_id : decoded.user })
                if(user.isAdmin) {
                    return next()
                }

            }
        }
    }
    console.log("Not admin")
    return res.send(401);
};