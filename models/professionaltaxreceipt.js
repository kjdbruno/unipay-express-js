'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfessionalTaxReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Assessment
      ProfessionalTaxReceipt.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        as: 'Assessment'
      });

      // Association with Profession
      ProfessionalTaxReceipt.belongsTo(models.Profession, {
        foreignKey: 'professionId',
        as: 'Profession'
      });
    }
  }
  ProfessionalTaxReceipt.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    professionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Professions',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    licenseNo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProfessionalTaxReceipt',
    tableName: 'ProfessionalTaxReceipts',
    timestamps: true
  });
  return ProfessionalTaxReceipt;
};