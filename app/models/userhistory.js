'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserHistory.init({
    user_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    result: DataTypes.STRING,
    last_play: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'UserHistory',
  });
  UserHistory.associat = function (models) {
    UserHistory.belongsTo(models.User, {})
  }
  return UserHistory;
};