'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Assocation with Assessment
      Transaction.hasMany(models.Assessment, {
        foreignKey: 'transactionId',
        as: 'Assessments'
      });

      // Association with Queue
      Transaction.hasMany(models.Queue, {
        foreignKey: 'transactionId',
        as: 'Queues'
      });

    }
  }
  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transactionNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions',
    timestamps: true
  });
  return Transaction;
};