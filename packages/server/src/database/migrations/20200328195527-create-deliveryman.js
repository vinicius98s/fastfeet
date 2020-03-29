module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'deliverymen',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: { allowNull: false, type: Sequelize.STRING },
        email: { allowNull: false, type: Sequelize.STRING, unique: true },
        avatar_id: {
          type: Sequelize.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        created_at: { type: Sequelize.DATE, field: 'created_at' },
        updated_at: { type: Sequelize.DATE, field: 'updated_at' },
      },
      {
        timestamps: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliverymen');
  },
};
