'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('appuser', [{
      id: '7304e868-9208-4b8d-9f22-889fdc78e38d',
      username: 'admin',
      password: '$2a$12$HEEjDo17Zr2mhyg6mhn7Wuip3ql3BPZH/YujmP2EKrvCq5yNayaTu',
      fullname: 'Administrator'
    }, {
      id: '56edf090-be7b-41ea-94d9-21b7e5f06c7c',
      username: 'user1',
      password: '$2a$12$HEEjDo17Zr2mhyg6mhn7Wuip3ql3BPZH/YujmP2EKrvCq5yNayaTu',
      fullname: 'User 1'
    }, {
      id: '52c2292d-2dc5-4a6e-9992-83b5b5d8620f',
      username: 'user2',
      password: '$2a$12$HEEjDo17Zr2mhyg6mhn7Wuip3ql3BPZH/YujmP2EKrvCq5yNayaTu',
      fullname: 'User 2'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('appuser', null, {});
  }
};