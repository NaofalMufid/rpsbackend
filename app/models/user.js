'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    // encryption
    // static #encrypt = (password) => bcrypt.hashSync(password, 10)
    // register user
    static register = ({ username, email, password}) => {
      // const encryptPassword = this.#encrypt(password)
      return this.create({ username, email, password })
    }
    // checking password
    checkPassword = password => bcrypt.compareSync(password, this.password)

    // jwt method
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }
      // token verification
      const secretToken = 'cukupkitayangtahu'
      // create token
      const token = jwt.sign(payload, secretToken, {expiresIn: 86400 * 30})
      return token
    }

    // authentication for login
    static authenticate = async ({username, password}) => {
      try {
        const user = await this.findOne({ where: {username} })
        if(!user) return Promise.reject("User not found")
        const isPasswordValid = user.checkPassword(password)
        if(!isPasswordValid) return Promise.reject("Wrong Password")
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    roles: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }
  })
  User.associate = function (models) {
    User.hasOne(models.UserBiodata, {
      foreignKey: 'user_id'
    })
  }
  User.associate = function (models) {
    User.hasOne(models.UserHistory, {
      foreignKey: 'user_id'
    })
  }
  return User;
};