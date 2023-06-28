'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.channel, { through: "channel_appuser" });
    }
  }
  AppUser.init({
    id: DataTypes.UUID,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    avatar_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'appuser',
  });
  return AppUser;
};