'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CorporationCedula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Assessment
      CorporationCedula.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        as: 'Assessment'
      });

      // Association with Organization
      CorporationCedula.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'Organization'
      });

      // Association with BusinessNature
      CorporationCedula.belongsTo(models.BusinessNature, {
        foreignKey: 'natureId',
        as: 'BusinessNature'
      });
    }
  }
  CorporationCedula.init({
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
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Organizations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    natureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BusinessNatures',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    incorporationPlace: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    incorporationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    basicTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    property: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    propertyTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    gross: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    grossTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    interest: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CorporationCedula',
    tableName: 'CorporationCedulas',
    timestamps: true
  });
  return CorporationCedula;
};