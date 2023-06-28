'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.appuser, { through: "channel_appuser" });
    }
  }
  Channel.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING(300),
    description: DataTypes.STRING(1000)
  }, {
    sequelize,
    modelName: 'channel',
  });
  return Channel;
};