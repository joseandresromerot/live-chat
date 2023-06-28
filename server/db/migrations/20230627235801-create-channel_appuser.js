'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('channel_appuser', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      channel_id: {
        type: Sequelize.UUID,
        references: {
          model: "channel",
          key: "id",
        },
      },
      appuser_id: {
        type: Sequelize.UUID,
        references: {
          model: "appuser",
          key: "id",
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('channel_appuser');
  }
};