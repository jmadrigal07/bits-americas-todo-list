
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        {id: 1, name: 'Open'},
        {id: 2, name: 'In progress'},
        {id: 3, name: 'Done'}
      ]);
    });
};
