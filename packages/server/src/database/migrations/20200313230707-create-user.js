module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: { allowNull: false, type: Sequelize.STRING },
        email: { allowNull: false, type: Sequelize.STRING, unique: true },
        password_hash: { allowNull: false, type: Sequelize.STRING },
        createdAt: { type: Sequelize.DATE, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
      },
      {
        timestamps: true,
      }
    );
  },
  down: queryInterface => {
    return queryInterface.dropTable('Users');
  },
};
