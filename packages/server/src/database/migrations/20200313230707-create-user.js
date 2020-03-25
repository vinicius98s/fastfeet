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
        created_at: { type: Sequelize.DATE, field: 'created_at' },
        updated_at: { type: Sequelize.DATE, field: 'updated_at' },
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
