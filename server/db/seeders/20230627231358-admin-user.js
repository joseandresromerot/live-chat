'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('appuser', [{
      id: '7304e868-9208-4b8d-9f22-889fdc78e38d',
      username: 'admin',
      password: '$2a$12$HEEjDo17Zr2mhyg6mhn7Wuip3ql3BPZH/YujmP2EKrvCq5yNayaTu',
      fullname: 'Administrator'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('appuser', null, {});
  }
};