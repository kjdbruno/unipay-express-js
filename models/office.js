// models/office.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <--- THIS IS THE REQUIRED FUNCTION EXPORT
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with OfficeReceipt
      Office.hasMany(models.OfficeReceipt, {
        foreignKey: 'officeId',
        as: 'OfficeReceipts'
      });

      // Association with RevenueService
      Office.hasMany(models.RevenueService, {
        foreignKey: 'officeId',
        as: 'RevenueServices'
      });

      // Association with User
      Office.hasMany(models.User, {
        foreignKey: 'officeId',
        as: 'Users'
      });

    }
  }
  Office.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Office',
    tableName: 'Offices',
    timestamps: true,
  });
  return Office;
};