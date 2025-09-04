'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CorporationCedulas', {
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
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      natureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BusinessNatures',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      incorporationPlace: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      incorporationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      basicTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      property: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      propertyTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      gross: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      grossTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      interest: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.addIndex('CorporationCedulas', ['name']);
    await queryInterface.addIndex('CorporationCedulas', ['basicTax']);
    await queryInterface.addIndex('CorporationCedulas', ['property']);
    await queryInterface.addIndex('CorporationCedulas', ['propertyTax']);
    await queryInterface.addIndex('CorporationCedulas', ['gross']);
    await queryInterface.addIndex('CorporationCedulas', ['grossTax']);
    await queryInterface.addIndex('CorporationCedulas', ['totalTax']);
    await queryInterface.addIndex('CorporationCedulas', ['interest']);
    await queryInterface.addIndex('CorporationCedulas', ['total']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('CorporationCedulas', ['name']);
    await queryInterface.removeIndex('CorporationCedulas', ['basicTax']);
    await queryInterface.removeIndex('CorporationCedulas', ['property']);
    await queryInterface.removeIndex('CorporationCedulas', ['propertyTax']);
    await queryInterface.removeIndex('CorporationCedulas', ['gross']);
    await queryInterface.removeIndex('CorporationCedulas', ['grossTax']);
    await queryInterface.removeIndex('CorporationCedulas', ['totalTax']);
    await queryInterface.removeIndex('CorporationCedulas', ['interest']);
    await queryInterface.removeIndex('CorporationCedulas', ['total']);
    await queryInterface.dropTable('CorporationCedulas');
  }
};