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
          key: 'id'
        } 
      },
      score: {
        type: Sequelize.INTEGER
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
    return UserGameHistory
}