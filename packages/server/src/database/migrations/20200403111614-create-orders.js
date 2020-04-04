module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'orders',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        recipient_id: {
          type: Sequelize.INTEGER,
          references: { model: 'recipients', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        deliveryman_id: {
          type: Sequelize.INTEGER,
          references: { model: 'deliverymen', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        signature_id: {
          type: Sequelize.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        product: { allowNull: false, type: Sequelize.STRING },
        canceled_at: { allowNull: true, type: Sequelize.DATE },
        start_date: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        end_date: {
          allowNull: true,
          type: Sequelize.DATE,
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
    return queryInterface.dropTable('orders');
  },
};
