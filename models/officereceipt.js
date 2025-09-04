'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfficeReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Office
      OfficeReceipt.belongsTo(models.Office, {
        foreignKey: 'officeId',
        as: 'Office'
      });

      // Association with Receipt
      OfficeReceipt.belongsTo(models.PaymentReceipt, {
        foreignKey: 'receiptId',
        as: 'Receipt'
      });
      
    }
  }
  OfficeReceipt.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    officeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Offices',
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
    modelName: 'OfficeReceipt',
    tableName: 'OfficeReceipts',
    timestamps: true
  });
  return OfficeReceipt;
};