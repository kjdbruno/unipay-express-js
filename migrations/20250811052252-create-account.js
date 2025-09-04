'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      balance: {
        type: Sequelize.ENUM('Credit', 'Debit'),
        allowNull: false,
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
    await queryInterface.addIndex('Accounts', ['code']);
    await queryInterface.addIndex('Accounts', ['title']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Accounts', ['code']);
    await queryInterface.removeIndex('Accounts', ['title']);
    await queryInterface.dropTable('Accounts');
  }
};