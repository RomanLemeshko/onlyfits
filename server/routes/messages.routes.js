const express = require('express');
const router = express.Router();

module.exports = (io, messages) => {
  router.get('/', (req, res) => {
    res.json(messages);
  });

  router.post('/', (req, res) => {
    const message = req.body;
    messages.push(message);
    io.emit('chat message', message);
    res.status(201).json(message);
  });

  router.delete('/', (req, res) => {
    messages.length = 0;
    io.emit('clear messages'); 
    res.status(204).end();
  });

  return router;
};