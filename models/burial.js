'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Burial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Assessment
      Burial.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        as: 'Assessment'
      });
    }
  }
  Burial.init({
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
    permission: {
      type: DataTypes.ENUM('Inter', 'Disinter', 'Remove'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nationalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Nationalities',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sexes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    dateOfDeath: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    causeOfDeath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cemetery: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isInfectious: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isEmbalmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dateOfDisposition: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Burial',
    tableName: 'Burials',
    timestamps: true
  });
  return Burial;
};