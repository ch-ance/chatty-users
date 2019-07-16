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

async function getPendingContacts(username) {
    return await db('pendingContacts')
        .where({ second_user: username })
        .select('*')
}

async function getPendingContact(username) {
    return await db('pendingContacts')
        .where({ first_user: username })
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

    await db('friendships')
        .insert({
            first_user: second_user,
            second_user: first_user,
        })
        .returning('*')

    return newFriendship
}

async function removePendingRequest(username) {
    await db('pendingContacts')
        .where({ first_user: username })
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
