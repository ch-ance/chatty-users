const db = require('../dbConfig')

module.exports = {
    find,
    findByUsername,
    add,
    sendContactRequest,
    getContacts,
    acceptContact,
    getPendingContacts,
    getPendingContact,
    removePendingRequest,
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

async function getPendingContact(id) {
    return await db('pendingContacts')
        .where({ id })
        .first()
        .select('*')
}

async function acceptContact(first_user, second_user) {
    const newFriendship = await db('friendships')
        .insert({
            first_user,
            second_user,
        })
        .returning('*')

    return newFriendship
}

async function removePendingRequest(id) {
    await db('pendingContacts')
        .where({ id })
        .first()
        .delete()
}

async function getContacts(username) {
    return await db('friendships')
        .where({ first_user: username })
        .select('*')
}

async function add(user) {
    const newUser = await db('users')
        .insert(user)
        .returning('*')
    return newUser
}
