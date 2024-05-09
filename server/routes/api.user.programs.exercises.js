const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.get('/get-user-programs-exercises', async (req, res) => {
  try {
    const { prog_ids } = req.query; // Retrieve data from the header
    // const userProgramsIdParsed = JSON.parse(userProgramsId)
    console.log('!!!!!!11!: ', prog_ids);
    const allExcersises = [];
    let parsed;
    for (let each of prog_ids) {
      const allProg = await db.Exercise.findAll({
        where: { program_id: Number(each) },
        attributes: ['program_id', 'exercise_title', 'duration', 'rest_time'],
      });
      parsed = JSON.parse(JSON.stringify(allProg));
      allExcersises.push(parsed);
    }
    // console.log(allExcersises[0].length);
    // console.log(allExcersises[1].length);
    // console.log(allExcersises[2].length);

    // console.log(allExcersises);

    res.status(200).json(allExcersises);
  } catch (error) {
    console.log(
      'ОШИБКА ПОЛУЧЕНИЯ ВСЕХ УПРАЖНЕНИЯ ИЗ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ СЕРВЕР',
      error
    );
  }
});

module.exports = router;
