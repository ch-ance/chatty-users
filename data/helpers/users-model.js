const db = require('../dbConfig')

module.exports = {
    find,
    findByUsername,
    add,
    addContact,
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

async function addContact(first_friend_id, second_friend_id) {
    return await db('friendships')
        .insert({
            first_friend_id,
            second_friend_id,
        })
        .returning('*')
}

async function sendContactRequest(first_user_id, second_user_id) {
    const newRequest = await db('pendingContacts')
        .insert({
            first_user_id,
            second_user_id,
        })
        .returning('*')

    return newRequest
}

async function findContactRequest(id) {
    const request = await db('pendingContacts')
        .where({ id })
        .first()

    return request
}

async function getPendingContacts() {
    return await db('pendingContacts').select('*')
}

async function acceptContact(id) {
    const { first_user_id, second_user_id } = await db('pendingContacts')
        .where({ id })
        .first()
        .select('*')
        .then(async response => {
            await db('friendships')
                .insert({
                    first_user_id: response.first_user_id,
                    second_user_id: response.second_user_id,
                })
                .returning('*')
                .then(response2 => {
                    res.status(201).json(response2)
                    console.log('success')
                })
                .catch(err => {
                    console.error(err)
                    res.status(400).json(err)
                    console.log('error')
                })
        })

    console.log(first_user_id)
    console.log(second_user_id)
}

async function getContacts(userID) {
    return await db('friendships').select('*')
}

async function add(user) {
    const newUser = await db('users')
        .insert(user)
        .returning('*')
    return newUser
}
