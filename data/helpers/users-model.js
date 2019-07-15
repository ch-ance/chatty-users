const db = require('../dbConfig')

module.exports = {
    find,
    findByUsername,
    add,
    sendContactRequest,
    getContacts,
    acceptContact,
    getPendingContacts,
}

async function find() {
    return await db('users').select('*')
}

async function findByUsername(username) {
    const user = await db('users')
        .select('*')
        .where({ username })
        .first()
    return user
}

async function sendContactRequest(first_user, second_user) {
    const newRequest = await db('pendingContacts')
        .insert({
            first_user,
            second_user,
        })
        .returning('*')

    return newRequest
}

async function getPendingContacts() {
    return await db('pendingContacts').select('*')
}

async function acceptContact(id) {
    let valid = false
    const { first_user, second_user } = await db('pendingContacts')
        .where({ id })
        .first()
        .select('*')
        .then(async response => {
            await db('friendships')
                .insert({
                    first_user: response.first_user,
                    second_user: response.second_user,
                })
                .returning('*')
                .then(resp => {
                    res.status(201).json({ message: 'contact added' })
                })
                .catch(err => {
                    console.error(err)
                    res.status(402).json({ error: 'error adding contact' })
                })
        })

    console.log(first_user)
    console.log(second_user)
}

async function getContacts(username) {
    return await db('friendships').select('*')
}

async function add(user) {
    const newUser = await db('users')
        .insert(user)
        .returning('*')
    return newUser
}
