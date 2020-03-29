module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'files',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: { allowNull: false, type: Sequelize.STRING },
        path: { allowNull: false, type: Sequelize.STRING, unique: true },
        created_at: { type: Sequelize.DATE, field: 'created_at' },
        updated_at: { type: Sequelize.DATE, field: 'updated_at' },
      },
      {
        timestamps: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('files');
  },
};
