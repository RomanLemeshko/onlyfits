const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.post('/add-user-macros', async (req, res) => {
  try {
    const { kilocalories, proteins, fats, carbohydrates, purpose, user_id } = req.body; // Используйте user_id напрямую из тела запроса

    // Проверка на существование user_id в запросе
    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    // Создание записи макросов в базе данных
    const newMacro = await db.Macros.create({
      user_id,
      purpose,
      kilocalories,
      proteins,
      fats,
      carbohydrates,
    });

    res.status(201).json(newMacro); // Возвращаем созданный объект
  } catch (error) {
    console.error('ОШИБКА ДОБАВЛЕНИЯ КБЖУ ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/get-latest-user-macros', async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log("currentUserID: ", user_id);
    const currentUserID = user_id;
    const latestMacros = await db.Macros.findOne({
      where: { user_id: currentUserID },
      order: [['createdAt', 'DESC']], // Сортировка по убыванию даты создания
    //   include: [{ model: db.User, as: 'User' }], //! Включаем информацию о пользователе
    });

    if (!latestMacros) {
      return res
        .status(404)
        .json({ message: 'КБЖУ для текущего пользователя не найдены' });
    }

    // Отправляем найденные макросы
    res.json(latestMacros);

  } catch (error) {
    console.log('ОШИБКА ПОЛУЧЕНИЯ КБЖУ ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ', error);
    res.status(500).json({ message: 'Произошла ошибка при получении последних КБЖУ' });
  }
});

module.exports = router;
