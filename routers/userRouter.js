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
    const { first_user, second_user } = req.body
    await Users.sendContactRequest(first_user, second_user)
        .then(response => {
            console.log('RESPONSE: ', res)
            res.status(201).json({ response })
        })
        .catch(err => {
            console.error(err)
            res.status(400).json({ error: 'Error adding contact' })
        })
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

userRouter.get('/:username/contacts', async (req, res) => {
    const { username } = req.params
    console.log(username)
    await Users.getContacts(username)
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

    await Users.getPendingContact(id)
        .then(async users => {
            console.log(users)
            await console.log(users.first_user)
            await console.log(users.second_user)
            await Users.acceptContact(users.first_user, users.second_user)
                .then(async response => {
                    await console.log('attempting to remove')
                    console.log(response)
                    await Users.removePendingRequest(id)
                        .then(response => {
                            console.log(response)
                            res.status(201).json({
                                message: 'Accepted contact request',
                            })
                        })
                        .catch(err => {
                            console.error(err)
                            res.status(400).json(err)
                        })
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })

    // await Users.acceptContact({ first_user, second_user })
    // .then(response => {
    // console.log(response)
    // res.status(201).json(response)
    // })
    // .catch(err => {
    // console.error(err)
    // res.status(400).json(err)
    // })

    // await Users.acceptContact(id)
    //     .then(response => {
    //         res.status(201).json(response)
    //         console.log('end of res')
    //     })
    //     .catch(err => {
    //         res.status(400).json({
    //             message: 'Error accepting contact invitation',
    //             err,
    //         })
    //     })
})

module.exports = userRouter
