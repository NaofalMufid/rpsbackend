module.exports = (sequelize, Sequelize) => {
  const UserGameHistory = sequelize.define("UserGameHistory", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userGameId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserGames',
          key: 'id'
        } 
      },
      score: {
        type: Sequelize.INTEGER
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