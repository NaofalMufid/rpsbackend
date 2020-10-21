module.exports = (sequelize, Sequelize) => {
    const UserGames = sequelize.define("user_games", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    UserGames.associate = function (models) {
      UserGames.hasOne(models.UserGameBiodata, {
        foreignKey: 'user_id'
      })
    }
    UserGames.associate = function (models) {
      UserGames.hasOne(models.UserGameHistory, {
        foreignKey: 'user_id'
      })
    }
  return UserGames
};