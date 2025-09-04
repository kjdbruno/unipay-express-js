'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IndividualCedula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Assessment
      IndividualCedula.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        as: 'Assessment'
      });

      //Association with Profession
      IndividualCedula.belongsTo(models.Profession, {
        foreignKey: 'professionId',
        as: 'Profession'
      });

      // Association with Sex
      IndividualCedula.belongsTo(models.Sex, {
        foreignKey: 'sexId',
        as: 'Sex'
      });

      // Association with MaritalStatus
      IndividualCedula.belongsTo(models.MaritalStatus, {
        foreignKey: 'statusId',
        as: 'MaritalStatus'
      });

      // Association with Nationality
      IndividualCedula.belongsTo(models.Nationality, {
        foreignKey: 'nationalityId',
        as: 'Nationality'
      });
    }
  }
  IndividualCedula.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    professionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Professions',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthplace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sexId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Sexes',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MaritalStatuses',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    },
    nationalityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Nationalities',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    },
    basicTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    gross: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    grossTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    salaryTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    incomeTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    interest: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'IndividualCedula',
    tableName: 'IndividualCedulas',
    timestamps: true
  });
  return IndividualCedula;
};