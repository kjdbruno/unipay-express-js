'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProfessionalTaxReceipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assessmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Assessments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      professionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Professions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      licenseNo: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.addIndex('ProfessionalTaxReceipts', ['name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('ProfessionalTaxReceipts', ['name']);
    await queryInterface.dropTable('ProfessionalTaxReceipts');
  }
};