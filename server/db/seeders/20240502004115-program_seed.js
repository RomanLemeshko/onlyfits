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
        url:"https://wallpapers.com/images/hd/muscular-female-body-with-weights-efjdj6anvfcd62s2.jpg",
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
        url:"https://as1.ftcdn.net/v2/jpg/01/93/73/18/1000_F_193731868_afOYcVHhGIsrKB6IaO0kkQRVIXU47nvY.jpg",
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
        url:"https://i.pinimg.com/originals/6c/66/07/6c66072feaf71224f3c1a06c075b9fd3.jpg",
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
        url:"https://wallpapercave.com/wp/wp7578870.jpg",
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
        url:"https://wallpapercave.com/wp/wp4846215.jpg",
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
        url:"https://w.wallha.com/ws/11/WBNH6g4I.jpg",
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
