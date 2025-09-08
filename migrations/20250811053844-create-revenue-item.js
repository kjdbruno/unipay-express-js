'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RevenueItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'RevenueServices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      receiptId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PaymentReceipts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      isManual: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('RevenueItems', ['name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('RevenueItems', ['name']);
    await queryInterface.dropTable('RevenueItems');
  }
};