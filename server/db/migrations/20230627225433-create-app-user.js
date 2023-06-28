'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appuser', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      avatar_url: {
        allowNull: true,
        type: Sequelize.STRING(500)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appuser');
  }
};