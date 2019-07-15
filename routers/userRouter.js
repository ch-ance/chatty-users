const userRouter = require('express').Router()

const Users = require('../data/helpers/users-model')

userRouter.get('/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(201).json(users)
    } catch (error) {
        res.status(402).json({ message: 'Error retrieving users' })
    }
})

userRouter.post('/request-add-contact', async (req, res) => {
    try {
        const { first_user_id, second_user_id } = req.body
        console.log(req.body)
        await Users.sendContactRequest(first_user_id, second_user_id).then(
            response => {
                console.log('RESPONSE: ', res)
                res.status(201).json({ response })
            },
        )
    } catch (error) {
        console.error(error)
        res.status(402).json({ error: 'Error adding contact' })
    }
})

userRouter.get('/pending-contacts', async (req, res) => {
    return await Users.getPendingContacts()
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.error(err)
            res.status(400).json(err)
        })
})

userRouter.get('/contacts', async (req, res) => {
    const { userID } = req.body
    await Users.getContacts(userID)
        .then(response => {
            console.log(response)
            res.status(201).json(response)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: 'error fetching contacts' })
        })
})

userRouter.post('/accept-contact', async (req, res) => {
    const { id } = req.body

    await Users.acceptContact(id)
        .then(response => {
            console.log(response)
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error accepting contact invitation',
            })
        })
})

module.exports = userRouter
