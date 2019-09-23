
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {message: 'Task 1', status: 1},
        {message: 'Task 2', status: 2},
        {message: 'Task 3', status: 3}
      ]);
    });
};
