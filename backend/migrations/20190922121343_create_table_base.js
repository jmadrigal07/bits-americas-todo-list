
const { migrations } = require('../knexfile');

exports.up = function(knex) {
  return knex.schema.withSchema('public')
    .createTable('tasks', function (table) {
       table.increments('id');
       table.string('message', 255).notNullable();
       table.integer('status', 10);
       table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
       table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    }).createTable('status', function (table) {
       table.increments('id');
       table.string('name', 1000).notNullable();
       table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
       table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    }).then( () => {
        knex.raw(migrations.onUpdateTrigger('tasks'));
        knex.raw(migrations.onUpdateTrigger('status'));
    });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable("tasks")
      .dropTable("status");
};
