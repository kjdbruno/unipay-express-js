'use strict';

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
    const offices = [
      {
        "name": "City Information and Communications Technology Office",
        "alias": "CICTO",
        "email": "cicto@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Administrator",
        "alias": "ADM",
        "email": "adm@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Agriculturist",
        "alias": "AGR",
        "email": "agr@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Health Officer",
        "alias": "CHO",
        "email": "cho@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Legal Officer",
        "alias": "CLO",
        "email": "clo@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Treasurer",
        "alias": "CTO",
        "email": "cto@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Engineering",
        "alias": "OCE",
        "email": "oce@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Environment and Natural Resources",
        "alias": "CENRO",
        "email": "enr@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City General Services Officer",
        "alias": "GSO",
        "email": "gso@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Market Supervisor",
        "alias": "EEM",
        "email": "eem@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Assessor",
        "alias": "OCA",
        "email": "oca@sanfernandocity.gov.ph"
      },
      {
        "name": "Office for Public Safety",
        "alias": "OPS",
        "email": "ops@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of Secretary to the Sangguniang Panglungsod",
        "alias": "OSSP",
        "email": "ossp@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Planning and Development Coordinator",
        "alias": "PDO",
        "email": "pdo@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the Local Economic and Business Development Officer",
        "alias": "LEBDO",
        "email": "lebdo@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Civil Registrar",
        "alias": "REG",
        "email": "reg@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Social Welfare and Development Officer",
        "alias": "CSWD",
        "email": "swd@sanfernandocity.gov.ph"
      },
      {
        "name": "Office of the City Veterinarian",
        "alias": "VET",
        "email": "vet@sanfernandocity.gov.ph"
      }
    ];
    await queryInterface.bulkInsert('Offices', [
      ...offices.map(office => ({
        Name: office.name,
        Alias: office.alias,
        Email: office.email,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      }))
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Offices', null, {});
  }
};
