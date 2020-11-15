'use strict';
const bcrypt = require('bcrypt')
const encrypt = (password) => bcrypt.hashSync(password, 10)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users',
      [{
        "username": "superadmin",
        "email": "admin@rps.com",
        "roles": "SuperAdmin",
        "password": encrypt("secretpass"),
        createdAt : new Date(),
        updatedAt : new Date()
      }]
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
