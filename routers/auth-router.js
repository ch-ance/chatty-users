require('dotenv').config()

const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../data/helpers/users-model')
const secret = process.env.JWT_SECRET || 'secret'

authRouter.post('/register', (req, res) => {
    try {
        const { username, password } = req.body

        const userID = getID()

        const hash = bcrypt.hashSync(password, 10)

        const user = {
            username,
            password: hash,
            userID,
        }
        Users.add(user)
        res.status(201).json({
            message: `Successfully registered user ${username}`,
        })
    } catch (error) {
        res.status(400).json({ message: 'Error adding user' })
    }

    function getID() {
        const id = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5)
            .toUpperCase()
            .concat(
                Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    .substr(0, 5)
                    .toUpperCase(),
            )
        return id
    }
})

authRouter.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user)
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                    userID: user.userID,
                })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Something went wrong' })
        })
})

function genToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, secret, options)
}

module.exports = authRouter
