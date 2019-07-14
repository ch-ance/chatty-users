exports.up = function(knex) {
    return knex.schema.createTable('friendships', friendships => {
        friendships
            .string('first_user_id', 12)
            .unique()
            .notNullable()
            .primary()
            .references('userID')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
        friendships
            .string('second_user_id', 12)
            .unique()
            .notNullable()
            .references('userID')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('friendships')
}
