'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    content: DataTypes.TEXT,
    channel_id: {
      type: DataTypes.UUID,
      references: {
        model: "channel",
        key: "id",
      },
    },
    appuser_id: {
      type: DataTypes.UUID,
      references: {
        model: "appuser",
        key: "id",
      },
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'message',
    timestamps: false
  });
  return Message;
};