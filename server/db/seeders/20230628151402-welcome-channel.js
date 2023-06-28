'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('channel', [{
      id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      name: 'Welcome',
      description: 'This is a channel for new users'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('channel', null, {});
  }
};