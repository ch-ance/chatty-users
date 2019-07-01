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

        const user = {
            username,
            password,
            userID
        }
        await Users.add(user)
        res.status(201).json({ user })
    } catch (error) {
        res.status(400).json({ message: 'Error adding user' })
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const [user] = await Users.findByUsername(username)

        const hash = bcrypt.hashSync(user.password, 10)

        if (bcrypt.compareSync(password, hash)) {
            const token = genToken(user)
            res.status(201).json(
                {
                    username: user.username,
                    password: hash
                },
                token
            )
        } else {
            res.status(500).json({ message: 'Invalid credentials ' })
        }
    } catch (error) {
        res.status(500).json({ message: 'User not found' })
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
