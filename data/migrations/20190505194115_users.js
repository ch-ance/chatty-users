exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users
            .string('username', 32)
            .unique()
            .primary()
            .notNullable()

        users.string('password', 128).notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
}
