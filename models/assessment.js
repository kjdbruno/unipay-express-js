'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Transaction
      Assessment.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        as: 'Transaction'
      });

      // Association with AssessmentItem
      Assessment.hasMany(models.AssessmentItem, {
        foreignKey: 'assessmentId',
        as: 'AssessmentItems'
      });

      // Association with Burial
      Assessment.hasMany(models.Burial, {
        foreignKey: 'assessmentId',
        as: 'Burials'
      });

      // Association with CorporationCedula
      Assessment.hasMany(models.CorporationCedula, {
        foreignKey: 'assessmentId',
        as: 'CorporationCedulas'
      });

      // Association with IndividualCedula
      Assessment.hasMany(models.IndividualCedula, {
        foreignKey: 'assessmentId',
        as: 'IndividualCedulas'
      });

      // Association with Payor
      Assessment.hasMany(models.Payor, {
        foreignKey: 'assessmentId',
        as: 'Payors'
      });

      // Association with ProfessionalTaxReceipt
      Assessment.hasMany(models.ProfessionalTaxReceipt, {
        foreignKey: 'assessmentId',
        as: 'ProfessionalTaxReceipts'
      });

      // Association with Slaughter
      Assessment.hasMany(models.Slaughter, {
        foreignKey: 'assessmentId',
        as: 'Slaughters'
      });

    }
  }
  Assessment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Transactions',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    referenceNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Unpaid', 'Paid', 'Void'),
      defaultValue: 'Unpaid',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Assessment',
    tableName: 'Assessments',
    timestamps: true
  });
  return Assessment;
};