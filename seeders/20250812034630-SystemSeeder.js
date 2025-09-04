'use strict';

const crypto = require("crypto"); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Systems', [
      { Name: 'Assessment System', Code: "UNP", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Business Permit and Licensing System', Code: "BPLS", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Engineering System', Code: "ES", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Individual Work Permit System', Code: "IWPS", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Transport System', Code: "TS", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Real Property Tax System', Code: "RPT", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Market Management System', Code: "EEM", Key: crypto.randomBytes(10).toString("hex"), createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Systems', null, {});
  }
};
