require('dotenv').config()

const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../data/helpers/users-model')
const secret = process.env.JWT_SECRET || 'secret'

authRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body

        const userID = Math.floor(Math.random() * 1000)

        const hash = bcrypt.hashSync(password, 10)

        const user = {
            username,
            password: hash,
            userID
        }
        await Users.add(user)
        res.status(201).json({ user })
    } catch (error) {
        res.status(400).json({ message: 'Error adding user' })
    }
})

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    const [user] = await Users.findByUsername(username)

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user)
        res.status(201).json(
            {
                message: `Welcome ${user.username}!`
            },
            token
        )
    } else {
        res.status(500).json({ message: 'Invalid credentials ' })
    }
})

function genToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = authRouter
