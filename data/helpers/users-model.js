const db = require('../dbConfig')

module.exports = {
    find,
    findByUsername,
    add
}

async function find() {
    return await db('users').select('*')
}

function findByUsername(username) {
    return db('users')
        .select('*')
        .where({ username })
        .first()
}

async function add(user) {
    const newUser = await db('users')
        .insert(user)
        .returning('*')
    return newUser
}
