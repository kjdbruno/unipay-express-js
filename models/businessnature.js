'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessNature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with CorporationCedula
      BusinessNature.hasMany(models.CorporationCedula, {
        foreignKey: 'natureId',
        as: 'CorporationCedulas'
      });
    }
  }
  BusinessNature.init({
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
    modelName: 'BusinessNature',
    tableName: 'BusinessNatures',
    timestamps: true
  });
  return BusinessNature;
};