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
        presentation:"Activities that will tone your body.",
        description: "Activities that will tone your body will help you get rid of stubborn fat. Activities that focus on high-intensity exercise will help you build endurance and strengthen your heart.",
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo%2Fcheetah.jpg?alt=media&token=b5fdb730-26ef-4cbb-8114-122031f656a1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'bear',
        program_type: 'strength',
        program_level: "medium",
        program_rating: 4,
        training_days: 30,
        presentation:"Activities that help you will become stronger and more confident.",
        description: "Activities that focus on resistance, time under tension, and weight lifting will help you become stronger and more confident in your body, and push yourself to your limits.",
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo%2Fbear.jpg?alt=media&token=867e4363-abf1-4d15-b3f8-7be6e230bb53",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'impala',
        program_type: 'stretching',
        program_rating: 3,
        program_level: "professional",
        training_days: 30,
        presentation:"Activities that will help keep your body in good condition.",
        description: "Activities that will help keep your body in good condition, your muscles elastic, and your joints strong. Exercises aimed at building a harmonious figure and strengthening key muscles.",
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo%2Fbull.jpg?alt=media&token=7da0bd12-20c1-49b6-90fa-0ad7133ff0cd",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'cheetah',
        program_type: 'cardio',
        program_rating: 6,
        program_level: "professional",
        training_days: 30,
        presentation:"Activities that will help take your body to the next level.",
        description: "Exercises that are suitable for a trained exercise enthusiast. Activities that will help you take your body to the next level. Exercises focused on long-term loads with alternating changes in muscle groups.",
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo%2Fwhale.jpg?alt=media&token=59fe593d-f4f0-4eea-a129-c4d9b2058e1a",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'whale',
        program_type: 'strength',
        program_rating: 5,
        program_level: "beginner",
        training_days: 30,
        presentation:"Activities that will help unlock potential of the body.",
        description: "Activities that will help unlock the potential of the body and instill a love for physical activity. Exercises aimed at increasing muscle mass in a relatively short period of time. A good start. if you are a beginner.",
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo%2Fimpala.jpg?alt=media&token=f869c4fc-03b2-475d-9997-1fd495a74aaa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'panter',
        program_type: 'stretching',
        program_rating: 7,
        program_level: "medium",
        training_days: 30,
        presentation:"Exercises to help you be more graceful and confident.",
        description: "Exercises aimed at developing body flexibility, strengthening the musculoskeletal system, as well as the heart muscle. Exercises to help you be more graceful and confident.",
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo%2Fpanther.jpg?alt=media&token=37e0866e-06f0-47ab-a88d-5766c81731ad",
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
