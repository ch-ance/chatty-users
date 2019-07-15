exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    username: 'first',
                    password: 'first',
                },
                {
                    username: 'second',
                    password: 'second',
                },
                {
                    username: 'third',
                    password: 'third',
                },
            ])
        })
}
