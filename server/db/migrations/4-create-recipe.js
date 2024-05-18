'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      kcal: {
        type: Sequelize.TEXT
      },
      protein: {
        type: Sequelize.TEXT
      },
      carbs: {
        type: Sequelize.TEXT
      },
      fat: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING
      },
      time:{
        type: Sequelize.STRING
      },
      instructions: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};