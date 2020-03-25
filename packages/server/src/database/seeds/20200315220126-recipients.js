module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Jhon Doe',
          street: 'Hollywood',
          number: 100,
          complement: 'Near the local school',
          state: 'SP',
          city: 'Diadema',
          zip_code: '09942011',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recipients', null, {});
  },
};
