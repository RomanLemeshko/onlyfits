'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const progArr = [
      {
        program_title: 'bull',
        program_type: 'cardio',
        program_rating: 5,
        program_level: "beginner",
        training_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'bear',
        program_type: 'strength',
        program_level: "medium",
        program_rating: 4,
        training_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'impalla',
        program_type: 'streching',
        program_rating: 3,
        program_level: "profesional",
        training_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'cheetah',
        program_type: 'cardio',
        program_rating: 6,
        program_level: "professional",
        training_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'whale',
        program_type: 'strength',
        program_rating: 5,
        program_level: "beginner",
        training_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'panter',
        program_type: 'streching',
        program_rating: 7,
        program_level: "medium",
        training_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Programs', progArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Programs', null, {});
  },
};
