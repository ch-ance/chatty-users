exports.up = function(knex) {
    return knex.schema.createTable('friendships', friendships => {
        friendships.increments('id')

        friendships
            .string('first_user', 32)
            .notNullable()
            .references('username')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
        friendships
            .string('second_user', 32)
            .notNullable()
            .references('username')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('friendships')
}
