'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameAssets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GameAssets.init({
    name: DataTypes.STRING,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameAssets',
  });
  return GameAssets;
};