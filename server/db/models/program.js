'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Exercise, { foreignKey: 'program_id' });

      this.belongsToMany(models.User, {
        foreignKey: 'program_id',
        through: 'User_Programs',
        as: 'programs',
      });
    }
  }
  Program.init(
    {
      program_title: DataTypes.STRING,
      program_type: DataTypes.STRING,
      program_level: DataTypes.STRING,
      program_rating: DataTypes.INTEGER,
      training_days: DataTypes.INTEGER,
      presentation:DataTypes.TEXT,
      description: DataTypes.TEXT,
      url: DataTypes.TEXT,

    },
    {
      sequelize,
      modelName: 'Program',
    }
  );
  return Program;
};
