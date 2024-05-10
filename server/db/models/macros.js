'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Macros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  Macros.init({
    user_id: DataTypes.INTEGER,
    purpose: DataTypes.STRING,
    kilocalories: DataTypes.INTEGER,
    proteins: DataTypes.INTEGER,
    carbohydrates: DataTypes.INTEGER,
    fats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Macros',
  });
  return Macros;
};