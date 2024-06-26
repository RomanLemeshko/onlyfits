'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.RefreshToken, { foreignKey: 'userId' });

      this.belongsToMany(models.Program, {
        foreignKey: 'user_id',
        through: 'User_Programs',
        as: 'users',
      });

      this.hasMany(models.Macros, {foreignKey: 'user_id'});
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
