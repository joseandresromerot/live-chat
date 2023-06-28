'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('channel_appuser', [{
      id: '7309f562-f9e4-4074-af6c-f852318e0baa',
      channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      appuser_id: '7304e868-9208-4b8d-9f22-889fdc78e38d'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('channel_appuser', null, {});
  }
};