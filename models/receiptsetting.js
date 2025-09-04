'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReceiptSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with PaymentType
      ReceiptSetting.belongsTo(models.PaymentType, {
        foreignKey: 'typeId',
        as: 'PaymentType'
      });

      // Association with Receipt
      ReceiptSetting.belongsTo(models.PaymentReceipt, {
        foreignKey: 'receiptId',
        as: 'Receipt'
      });
    }
  }
  ReceiptSetting.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PaymentTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    receiptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Receipts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ReceiptSetting',
    tableName: 'ReceiptSettings',
    timestamps: true
  });
  return ReceiptSetting;
};