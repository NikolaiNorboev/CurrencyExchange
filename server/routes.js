const express = require('express');
const parser = require('./parser');

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const data = await parser(0); 
    res.status(200).send(data);
  } catch(e) {
    res.send(e);
  }
})

router.post('/data', async (req, res) => {
  const { id, startDate, endDate } = req.body;
  try {
    const data = await parser(1, id, startDate, endDate); 
    res.status(200).send(data);
  } catch(e) {
    res.send(e);
  }
})

module.exports = router;
