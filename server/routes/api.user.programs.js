const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.get('/get-user-programs', async (req, res) => {
  try {
    const { user_id } = req.query;
    const allProg = await db.Program.findAll({
      include: [
        {
          model: db.User,
          where: { id: user_id },
          as: "programs"
        },
      ],
    });
    const parsed = JSON.parse(JSON.stringify(allProg));
    res.status(200).json(parsed);
  } catch (error) {
    console.log('ОШИБКА ПОЛУЧЕНИЯ ВСЕХ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ СЕРВЕР', error);
  }
});

router.post('/add-user-program', async (req, res) => {
  try {
    const { user_id, program_id } = req.body;
    
    const check = await db.User_Program.findOne({where:{user_id, program_id}})
    if(!check){
      await db.User_Program.create({ user_id, program_id });
    res.sendStatus(201);
    } else {
      res.status(409).json({message:"program already added"})

    }
  } catch (error) {
    console.log('ОШИБКА ДОБАВЛЕНИИ ПРОГРАММЫ ПОЛЬЗОВАТЕЛЯ СЕРВЕР', error);
  }
});

module.exports = router;