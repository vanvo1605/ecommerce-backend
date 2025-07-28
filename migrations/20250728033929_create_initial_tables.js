/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true); // created_at, updated_at
    })
    .createTable('chat_messages', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.text('role').notNullable(); // 'user' or 'assistant'
        table.text('botresponse').notNullable();
        table.text('message').notNullable();
        table.timestamps(true, true); // created_at, updated_at
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema
    .dropTableIfExists('chat_messages')
    .dropTableIfExists('users');
};
