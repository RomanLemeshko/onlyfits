'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Program, { foreignKey: 'program_id' });
    }
  }
  Exercise.init(
    {
      program_id: DataTypes.INTEGER,
      exercise_title: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      rest_time: DataTypes.INTEGER,
      exercise_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  return Exercise;
};
