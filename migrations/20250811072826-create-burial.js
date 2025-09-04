'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Burials', {
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
      permission: {
        type: Sequelize.ENUM('Inter', 'Disinter', 'Remove'),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nationalityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Nationalities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sexId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sexes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dateOfDeath: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      causeOfDeath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cemetery: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isInfectious: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isEmbalmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      dateOfDisposition: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.addIndex('Burials', ['name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Burials', ['name']);
    await queryInterface.dropTable('Burials');
  }
};