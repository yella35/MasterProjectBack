const User = require('../../models/user.model').User
const crypto = require('crypto')

module.exports.GETALL = async function (req, res) {
    try {
        const users = await User.find({}, {password: 0, salt: 0})
        if (!users) {
            res.status(404)
            res.send({msg: 'Aucun utilisateurs trouvé'})
            return
        }
        res.send({users: users})
    } catch (err) {
        console.error(err)
        res.status(500)
        return res.send({msg: 'INTERNAL SERVER ERROR'})
    }
}

module.exports.GET = async function (req, res) {
    let user
    let idUser = req.params.id
    if (!idUser) {
        res.status(400)
        res.send({msg: 'Utilisateur introuvable'})
        return
    }
    try {
        user = await
            User.findOne({_id: idUser}, {password: 0, salt: 0})
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({msg: 'MongoDB error'})
        return
    }
    if (!user) {
        res.status(400)
        res.send({msg: 'Aucun utilisateur trouvé'})
        return
    }
    res.send({user: user})
}

module.exports.PUT = async function (req, res) {
    let user
    let userInfo = req.body.user
    if (!userInfo) {
        res.status(400)
        res.send({msg: 'No user to add'})
        return
    }
    if (!userInfo.mail || !userInfo.firstName || !userInfo.name | userInfo.password)

        User.findOne({mail: userInfo.mail.toLowerCase()}, async function (err, user_check) {
            console.log(err)
            if (err) return res.sendStatus(500)
            if (user_check) {
                res.status(400)
                return res.send('Cette adresse mail est déjà enregistrée sur My MovieUP');
            }
            const salt = genRandomString(16)
            const passwordData = sha512(userInfo.password, salt)
            const user = new User({
                mail: userInfo.mail.toLowerCase(),
                password: passwordData.passwordHash,
                salt: salt,
                firstName: userInfo.firstName,
                name: name
            });
            user.save(function (err) {
                if (err) {
                    res.status(500)
                    res.send('Une erreur est survenue')
                    return
                }
                res.status(200)
                res.send('Enregistrement réalisé')
            })
        })

}


const genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
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