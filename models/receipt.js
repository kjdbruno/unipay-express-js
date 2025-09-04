'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with OfficeReceipt
      Receipt.hasMany(models.OfficeReceipt, {
        foreignKey: 'receiptId',
        as: 'OfficeReceipts'
      });

      // Association with ReceiptSetting
      Receipt.hasMany(models.ReceiptSetting, {
        foreignKey: 'receiptId',
        as: 'ReceiptSettings'
      });
    }
  }
  Receipt.init({
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Receipt',
    tableName: 'Receipts',
    timestamps: true
  });
  return Receipt;
};