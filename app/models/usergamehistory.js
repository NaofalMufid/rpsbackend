module.exports = (sequelize, Sequelize) => {
    const UserGameHistory = sequelize.define("user_game_history", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'user_games',
            key: 'user_id'
          } 
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lastPlay: {
          type: Sequelize.DATE
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
      UserGameHistory.associate = function (models) {
        UserGameHistory.belongsTo(models.UserGames, {})
      }
      return UserGameHistory
  }