exports.up = function(knex) {
    return knex.schema.createTable('pendingContacts', pending => {
        pending.increments('id')
        pending
            .string('first_user_id', 12)
            .notNullable()
            .references('userID')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
        pending
            .string('second_user_id', 12)
            .notNullable()
            .references('userID')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pendingContacts')
}
