'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AssessmentItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assessmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowNull: false,
        references: {
          model: 'Assessments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'RevenueItems',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      itemCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Unpaid', 'Paid', 'Void'),
        defaultValue: 'Unpaid',
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
    await queryInterface.addIndex('AssessmentItems', ['itemCode']);
    await queryInterface.addIndex('AssessmentItems', ['amount']);
    await queryInterface.addIndex('AssessmentItems', ['status']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('AssessmentItems', ['itemCode']);
    await queryInterface.removeIndex('AssessmentItems', ['amount']);
    await queryInterface.removeIndex('AssessmentItems', ['status']);
    await queryInterface.dropTable('AssessmentItems');
  }
};