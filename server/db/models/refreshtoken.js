'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RefreshToken.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  RefreshToken.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    }
  );
  return RefreshToken;
};
