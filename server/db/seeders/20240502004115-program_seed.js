'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const progArr = [
      {
        program_title: 'бык',
        program_type: 'кардио',
        program_rating: 5,
        program_level: "начинающий",
        training_days: 30,
        description: "Занятия которые приведут тело в тонус, помогут избавится от 'упрямого' жира. Занятия, в которых основное внимание уделяется высокоинтенсивным упражнениям, помогут тебе выработать выносливость, укрепить сердце.",
        url:"https://wallpapers.com/images/hd/muscular-female-body-with-weights-efjdj6anvfcd62s2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'медведь',
        program_type: 'сила',
        program_level: "средний",
        program_rating: 4,
        training_days: 30,
        description: "Занятия, в которых основное внимание уделяется сопротивлению, времени под напряжением и поднятию тяжестей, помогут стать сильнее и чувствовать себя увереннее в своем теле, а также довести себя до предела своих возможностей.",
        url:"https://as1.ftcdn.net/v2/jpg/01/93/73/18/1000_F_193731868_afOYcVHhGIsrKB6IaO0kkQRVIXU47nvY.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'импала',
        program_type: 'растяжка',
        program_rating: 3,
        program_level: "профессионал",
        training_days: 30,
        description: "Занятия, которые помогут держать тело в хорошем состоянии, мышци эластичными, а суставы крепкими. Упражнения, ориентирванные на построение гармоничной фигуры и укреплению узловых мышц.",
        url:"https://i.pinimg.com/originals/6c/66/07/6c66072feaf71224f3c1a06c075b9fd3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'гепард',
        program_type: 'кардио',
        program_rating: 6,
        program_level: "профессионал",
        training_days: 30,
        description: "Упражнения, которые подойдут подготовленному любителю заниматься. Занятия, которые помогут тебе вывести свое тело на новый уровень. Упражнения, сфокусированны на длительных нагрузках с поочередной сменой групп мышц",
        url:"https://wallpapercave.com/wp/wp7578870.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'кит',
        program_type: 'сила',
        program_rating: 5,
        program_level: "начинающий",
        training_days: 30,
        description: "Занятия, которые помогут раскрыть потенциал тела т привить любовь к физическим нагрузкам. Упражнения, ориентрованные на рост мышечной массы в относительно короткий период времени. Хорошее начало. если ты новичок.",
        url:"https://wallpapercave.com/wp/wp4846215.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        program_title: 'пантера',
        program_type: 'растяжка',
        program_rating: 7,
        program_level: "средний",
        training_days: 30,
        description: "Занятия, направленные на выработку гибкости тела, укрепление опорно-двигательного аппарата, а также сердечной мышцы. Упражнения, которые помогут тебе быть более грациозным и уверенным.",
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
