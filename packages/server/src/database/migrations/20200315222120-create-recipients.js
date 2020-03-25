module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'recipients',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: { allowNull: false, type: Sequelize.STRING },
        street: { allowNull: false, type: Sequelize.STRING },
        number: { allowNull: false, type: Sequelize.STRING },
        complement: Sequelize.STRING,
        city: { allowNull: false, type: Sequelize.STRING },
        state: { allowNull: false, type: Sequelize.STRING },
        zip_code: { allowNull: false, type: Sequelize.STRING },
        created_at: { type: Sequelize.DATE, field: 'created_at' },
        updated_at: { type: Sequelize.DATE, field: 'updated_at' },
      },
      {
        timestamps: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  },
};
