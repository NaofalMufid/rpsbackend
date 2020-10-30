const bcrypt = require('bcrypt-nodejs')
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
    UserGames.beforeSave((user, options) => {
      if (user.changed('password')) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
      }
    })
    UserGames.prototype.comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
          return cb(err)
        }
        cb(null, isMatch)
      })
    }
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