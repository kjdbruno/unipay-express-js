'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWindow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with User
      UserWindow.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });

      // Association with Window
      UserWindow.belongsTo(models.Window, {
        foreignKey: 'windowId',
        as: 'Window'
      });
    }
  }
  UserWindow.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    windowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Windows',
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
    modelName: 'UserWindow',
    tableName: 'UserWindows',
    timestamps: true
  });
  return UserWindow;
};