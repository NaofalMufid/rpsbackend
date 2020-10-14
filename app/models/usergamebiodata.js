module.exports = (sequelize, Sequelize) => {
  const UserGameBiodata = sequelize.define("user_game_biodata", {
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
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
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