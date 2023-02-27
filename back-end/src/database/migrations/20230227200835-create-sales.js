'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2),
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('sales');
  },
};