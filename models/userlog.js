// models/userLog.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <--- THIS IS THE REQUIRED FUNCTION EXPORT
  class UserLog extends Model {
    static associate(models) {
      // define association here

      // Association with User
      UserLog.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
    }
  }
  UserLog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    socketId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserLog',
    tableName: 'UserLogs',
    timestamps: true,
  });
  return UserLog;
};