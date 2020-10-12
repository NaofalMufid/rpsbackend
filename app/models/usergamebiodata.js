module.exports = (sequelize, Sequelize) => {
  const UserGameBiodata = sequelize.define("UserGameBiodata", {
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
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    avatar: {
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
  return UserGameBiodata
}