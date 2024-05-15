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
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo_2024-05-15_16-49-05.jpg?alt=media&token=978751d9-b6a5-4c16-918e-246a66481121",
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
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo_2024-05-15_16-49-01.jpg?alt=media&token=91b62d44-42bf-4ac3-b4b9-24a5b251233c",
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
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo_2024-05-15_16-49-06%20(2).jpg?alt=media&token=eb4586d1-6794-41d2-8f22-24f7ea362c3e",
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
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo_2024-05-15_16-49-04%20(2).jpg?alt=media&token=0c6c5df4-3455-4026-ab69-153b1a67625b",
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
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo_2024-05-15_16-49-06.jpg?alt=media&token=a307406f-cd8b-41fc-b9bf-12b81674f35b",
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
        url:"https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/photo_2024-05-15_16-49-05%20(2).jpg?alt=media&token=8bd997c1-5e52-467c-8027-4a281cb84ab0",
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
