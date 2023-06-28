'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('channel', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('channel');
  }
};