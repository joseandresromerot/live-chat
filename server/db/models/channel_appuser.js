'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChannelAppUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  ChannelAppUser.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    channel_id: DataTypes.UUID,
    appuser_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ChannelAppUser',
    tableName: 'channel_appuser',
    timestamps: false
  });
  return ChannelAppUser;
};