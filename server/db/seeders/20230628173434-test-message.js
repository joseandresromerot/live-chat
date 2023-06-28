'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('message', [{
      id: 'bbd621b8-83ee-4969-8577-2873654180f3',
      content: 'This is a test message created from a sequelize seed',
      created_at: '2023-06-28 09:10:55',
      channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      appuser_id: '7304e868-9208-4b8d-9f22-889fdc78e38d'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('message', null, {});
  }
};
