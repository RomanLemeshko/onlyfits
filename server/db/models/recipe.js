'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init({
    title: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    kcal: DataTypes.TEXT,
    protein: DataTypes.TEXT,
    carbs: DataTypes.TEXT,
    fat: DataTypes.TEXT,
    url: DataTypes.TEXT,
    type: DataTypes.STRING,
    time:DataTypes.STRING,
    instructions: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};