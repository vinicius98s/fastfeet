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
        street: { allowNull: false, type: Sequelize.STRING },
        number: { allowNull: false, type: Sequelize.STRING },
        complement: Sequelize.STRING,
        city: { allowNull: false, type: Sequelize.STRING },
        state: { allowNull: false, type: Sequelize.STRING },
        zip_code: { allowNull: false, type: Sequelize.STRING },
        createdAt: { type: Sequelize.DATE, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
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
