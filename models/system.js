'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class System extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Assessment
      System.hasMany(models.Assessment, {
        foreignKey: 'systemId',
        as: 'Assessments'
      });

      // Association with RevenueService
      System.hasMany(models.RevenueService, {
        foreignKey: 'systemId',
        as: 'RevenueServices'
      });
    }
  }
  System.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'System',
    tableName: 'Systems',
    timestamps: true
  });
  return System;
};