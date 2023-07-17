'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('message', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      id: {
        type: Sequelize.UUID
      },
      content: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('message');
  }
};