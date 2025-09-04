// models/index.js - Tailored for bundling
'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const config = require(__dirname + '/../config/config.js')[process.env.NODE_ENV || 'development'];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Explicitly require each model.
// This is safer for bundlers as they can statically analyze these requires.
// If your models directory is huge, this can be cumbersome,
// but for a typical number of models, it's robust.
db.Office = require('./office')(sequelize, Sequelize.DataTypes);
db.Role = require('./role')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.UserLog = require('./userlog')(sequelize, Sequelize.DataTypes);
db.Notification = require('./notification')(sequelize, Sequelize.DataTypes);
db.MaritalStatus = require('./maritalstatus')(sequelize, Sequelize.DataTypes);
db.Nationality = require('./nationality')(sequelize, Sequelize.DataTypes);
db.Position = require('./position')(sequelize, Sequelize.DataTypes);
db.Profession = require('./profession')(sequelize, Sequelize.DataTypes);
db.Sex = require('./sex')(sequelize,Sequelize.DataTypes);
db.PaymentType = require('./paymenttype')(sequelize, Sequelize.DataTypes);
db.PaymentReceipt = require('./paymentreceipt')(sequelize, Sequelize.DataTypes);
db.PaymentPartner = require('./paymentpartner')(sequelize, Sequelize.DataTypes);
db.PaymentChannel = require('./paymentchannel')(sequelize, Sequelize.DataTypes);
db.System = require('./system')(sequelize, Sequelize.DataTypes);
db.Fund = require('./fund')(sequelize, Sequelize.DataTypes);
db.Account = require('./account')(sequelize, Sequelize.DataTypes);
db.RevenueService = require('./revenueservice')(sequelize, Sequelize.DataTypes);
db.RevenueItem = require('./revenueitem')(sequelize, Sequelize.DataTypes);
db.Window = require('./window')(sequelize, Sequelize.DataTypes);
db.UserWindow = require('./userwindow')(sequelize, Sequelize.DataTypes);
db.Transaction = require('./transaction')(sequelize, Sequelize.DataTypes);
db.Queue = require('./queue')(sequelize, Sequelize.DataTypes);
db.Assessment = require('./assessment')(sequelize, Sequelize.DataTypes);
db.AssessmentItem = require('./assessmentitem')(sequelize, Sequelize.DataTypes);
db.Payor = require('./payor')(sequelize, Sequelize.DataTypes);
db.OfficeReceipt = require('./officereceipt')(sequelize, Sequelize.DataTypes);
db.Burial = require('./burial')(sequelize, Sequelize.DataTypes);
db.Slaughter = require('./slaughter')(sequelize, Sequelize.DataTypes);
db.BusinessNature = require('./businessnature')(sequelize, Sequelize.DataTypes);
db.Organization = require('./organization')(sequelize, Sequelize.DataTypes);
db.IndividualCedula = require('./individualcedula')(sequelize, Sequelize.DataTypes);
db.CorporationCedula = require('./corporationcedula')(sequelize, Sequelize.DataTypes);
db.ProfessionalTaxReceipt = require('./professionaltaxreceipt')(sequelize, Sequelize.DataTypes);
db.ReceiptSetting = require('./receiptsetting')(sequelize, Sequelize.DataTypes);
// ... add all your models here explicitly

// Run associations for all loaded models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;