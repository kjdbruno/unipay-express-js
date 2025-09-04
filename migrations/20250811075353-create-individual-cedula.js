'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IndividualCedulas', {
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
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      professionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Professions',
          key: 'id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      address: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      birthplace: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      sexId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Sexes',
          key: 'id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'MaritalStatuses',
          key: 'id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      nationalityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Nationalities',
          key: 'id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      basicTax: {
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
      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      salaryTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      income: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      incomeTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalTax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      interest: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
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
    await queryInterface.addIndex('IndividualCedulas', ['name']);
    await queryInterface.addIndex('IndividualCedulas', ['basicTax']);
    await queryInterface.addIndex('IndividualCedulas', ['gross']);
    await queryInterface.addIndex('IndividualCedulas', ['grossTax']);
    await queryInterface.addIndex('IndividualCedulas', ['salary']);
    await queryInterface.addIndex('IndividualCedulas', ['salaryTax']);
    await queryInterface.addIndex('IndividualCedulas', ['income']);
    await queryInterface.addIndex('IndividualCedulas', ['incomeTax']);
    await queryInterface.addIndex('IndividualCedulas', ['totalTax']);
    await queryInterface.addIndex('IndividualCedulas', ['interest']);
    await queryInterface.addIndex('IndividualCedulas', ['total']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('IndividualCedulas', ['name']);
    await queryInterface.removeIndex('IndividualCedulas', ['basicTax']);
    await queryInterface.removeIndex('IndividualCedulas', ['gross']);
    await queryInterface.removeIndex('IndividualCedulas', ['grossTax']);
    await queryInterface.removeIndex('IndividualCedulas', ['salary']);
    await queryInterface.removeIndex('IndividualCedulas', ['salaryTax']);
    await queryInterface.removeIndex('IndividualCedulas', ['income']);
    await queryInterface.removeIndex('IndividualCedulas', ['incomeTax']);
    await queryInterface.removeIndex('IndividualCedulas', ['totalTax']);
    await queryInterface.removeIndex('IndividualCedulas', ['interest']);
    await queryInterface.removeIndex('IndividualCedulas', ['total']);
    await queryInterface.dropTable('IndividualCedulas');
  }
};