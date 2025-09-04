'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with OfficeReceipt
      PaymentReceipt.hasMany(models.OfficeReceipt, {
        foreignKey: 'receiptId',
        as: 'OfficeReceipts'
      });

      // Association with ReceiptSetting
      PaymentReceipt.hasMany(models.ReceiptSetting, {
        foreignKey: 'receiptId',
        as: 'ReceiptSettings'
      });
    }
  }
  PaymentReceipt.init({
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
    modelName: 'PaymentReceipt',
    tableName: 'PaymentReceipts',
    timestamps: true
  });
  return PaymentReceipt;
};