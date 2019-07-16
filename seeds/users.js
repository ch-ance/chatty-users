const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    const password = bcrypt.hashSync('password', 10)
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    username: 'Bob',
                    password,
                },
                {
                    username: 'Alice',
                    password,
                },
                {
                    username: 'Tim',
                    password,
                },
            ])
        })
}
