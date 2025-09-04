'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Account
      RevenueService.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'Account'
      });

      // Association with Office
      RevenueService.belongsTo(models.Office, {
        foreignKey: 'officeId',
        as: 'Office'
      });

      // Association with Fund
      RevenueService.belongsTo(models.Fund, {
        foreignKey: 'fundId',
        as: 'Fund'
      });

      // Association with System
      RevenueService.belongsTo(models.System, {
        foreignKey: 'systemId',
        as: 'System'
      });

      // Association with RevenueItem
      RevenueService.hasMany(models.RevenueItem, {
        foreignKey: 'serviceId',
        as: 'RevenueItems'
      });
    }
  }
  RevenueService.init({
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
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    fundId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Funds',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    systemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Systems',
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
    modelName: 'RevenueService',
    tableName: 'RevenueServices',
    timestamps: true
  });
  return RevenueService;
};