'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with IndividualCedula
      Profession.hasMany(models.IndividualCedula, {
        foreignKey: 'professionId',
        as: 'IndividualCedulas'
      });

      // Association with ProfessionalTaxReceipt
      Profession.hasMany(models.ProfessionalTaxReceipt, {
        foreignKey: 'professionId',
        as: 'ProfessionalTaxReceipts'
      });
      
    }
  }
  Profession.init({
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
    modelName: 'Profession',
    tableName: 'Professions',
    timestamps: true
  });
  return Profession;
};