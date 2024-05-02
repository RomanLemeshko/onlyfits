'use strict';
const fs = require('fs');
const path = require('path');

function readJson() {
  const folder = path.join(__dirname, '..', '..', 'exerciseData');
  const file_name = 'exercise_data.json';
  const data = fs.readFileSync(path.join(folder, file_name), 'utf-8');
  const parsed = JSON.parse(data);
  return parsed;
}
// readJson()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arrExercises = readJson();

    await queryInterface.bulkInsert('Exercises', arrExercises, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', null, {});
  },
};
