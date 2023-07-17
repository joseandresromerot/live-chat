'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('message', [{
      id: 'bbd621b8-83ee-4969-8577-2873654180f3',
      content: 'This is a test message created from a sequelize seed',
      created_at: 1685003808,
      channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      appuser_id: '7304e868-9208-4b8d-9f22-889fdc78e38d'
    }, {
      id: '7dd85ba3-d7ed-4db8-9a39-368c1bbf5ef6',
      content: 'Hello channel! How are you?',
      created_at: 1685701232,
      channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      appuser_id: '7304e868-9208-4b8d-9f22-889fdc78e38d'
    }, {
      id: 'cc3c18b8-c945-41d5-9713-a27c9a995001',
      content: 'This group is for saying hello to new users',
      created_at: 1685702140,
      channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      appuser_id: '7304e868-9208-4b8d-9f22-889fdc78e38d'
    }, {
      id: 'eb0628cb-e1b0-40c8-84cb-4f02ff9d0032',
      content: 'I want to say hello to everyone',
      created_at: 1688566272,
      channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
      appuser_id: '7304e868-9208-4b8d-9f22-889fdc78e38d'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('message', null, {});
  }
};
