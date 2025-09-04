'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaritalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with IndividualCedula
      MaritalStatus.hasMany(models.IndividualCedula, {
        foreignKey: 'statusId',
        as: 'IndividualCedulas'
      });
    }
  }
  MaritalStatus.init({
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
    modelName: 'MaritalStatus',
    tableName: 'MaritalStatuses',
    timestamps: true
  });
  return MaritalStatus;
};