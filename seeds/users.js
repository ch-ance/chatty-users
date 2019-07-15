exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    username: 'first',
                    userID: 'FIRSTID',
                    password: 'first',
                },
                {
                    id: 2,
                    username: 'second',
                    userID: 'SECONDID',
                    password: 'second',
                },
                {
                    id: 3,
                    username: 'third',
                    userID: 'THIRDID',
                    password: 'third',
                },
            ])
        })
}
