const express = require('express');
const router = express.Router();
const db = require('../db/models')

router.get('/getAllPrograms', async(req, res) =>{

  try {
    const allProg = await db.Program.findAll()
    const parsed = JSON.parse(JSON.stringify(allProg))
    res.json(parsed)
    
  } catch (error) {
    console.log("ОШИБКА ПОЛУЧЕНИЯ ВСЕХ ПРОГРАММ СЕРВЕР", error)
    
  }

})


module.exports = router