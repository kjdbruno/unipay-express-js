'use strict';
const bcrypt = require('bcrypt');

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
    const hashedPassword = await bcrypt.hash('ITdepSFC!TY98', 10);

    await queryInterface.bulkInsert('Users', [
      { 
        firstname: 'Kenneth Jay',
        lastname: 'Bruno',
        username: 'SuperAdministrator', 
        password: hashedPassword, 
        roleId: 1, 
        officeId: 1, 
        avatar: 'avatar', 
        isActive: true, 
        createdAt: new Date(), 
        updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
