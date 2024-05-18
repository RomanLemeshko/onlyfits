const express = require('express');
const router = express.Router();
const db = require('../db/models')

router.get('/getAllRecipies', async(req, res) =>{

  try {
    const allRecipies = await db.Recipe.findAll()
    const parsed = JSON.parse(JSON.stringify(allRecipies))
    console.log("ALLLLLLLLLLL: ", parsed)
    res.json(parsed)
    
  } catch (error) {
    console.log("ОШИБКА ПОЛУЧЕНИЯ ВСЕХ РЕЦЕПТОВ С СЕРВЕРА", error)
    
  }

})


module.exports = router




