'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      program_title: {
        type: Sequelize.STRING,
      },
      program_type: {
        type: Sequelize.STRING,
      },
      program_level: {
        type: Sequelize.STRING,
      },
      program_rating: {
        type: Sequelize.INTEGER,
      },
      training_days: {
        type: Sequelize.INTEGER,
      },
      presentation:{
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      url: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Programs');
  },
};
