'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with AssessmentItem
      RevenueItem.hasMany(models.AssessmentItem, {
        foreignKey: 'revenueItemId',
        as: 'AssessmentItems'
      });

      // Association with RevenueService
      RevenueItem.belongsTo(models.RevenueService, {
        foreignKey: 'serviceId',
        as: 'RevenueService'
      });

      // Association with Receipt
      RevenueItem.belongsTo(models.PaymentReceipt, {
        foreignKey: 'receiptId',
        as: 'Receipt'
      });
      
    }
  }
  RevenueItem.init({
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
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RevenueServices',
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
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    isManual: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'RevenueItem',
    tableName: 'RevenueItems',
    timestamps: true
  });
  return RevenueItem;
};