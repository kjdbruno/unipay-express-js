// models/user.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <--- THIS IS THE REQUIRED FUNCTION EXPORT
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Role
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'Role'
      });

      // Association with Office
      User.belongsTo(models.Office, {
        foreignKey: 'officeId',
        as: 'Office'
      });

      // Association with UserLog
      User.hasMany(models.UserLog, {
        foreignKey: 'userId',
        as: 'UserLogs'
      });

      // Association with UserWindow
      User.hasMany(models.UserWindow, {
        foreignKey: 'userId',
        as: 'UserWindows'
      });

      // Association with Notification
      User.hasMany(models.Notification, {
        foreignKey: 'receiverId',
        as: 'Notifications'
      });
      
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
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
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  });
  return User;
};