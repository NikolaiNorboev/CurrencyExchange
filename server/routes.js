const express = require('express');
const { parser, info, change } = require('./parser');

const router = express.Router();

router
  .route('/data')
  .get(async (req, res) => {
    const { date } = req.query;
    // const data
    try {
      if(date){
        data = await parser(0, date);  
      } else {
        data = await parser(0);
      }
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  })
  .post(async (req, res) => {
    const { id, startDate, endDate } = req.body;
    try {
      const data = await parser(1, `${id}`, `${startDate}`, `${endDate}`);
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  })
// parser(1, 'R01239', '01/08/2020', '20/08/2020').then(console.log)
router
  .route('/admin')
  .get((req, res) => {
    try {
      res.send(info())
    } catch (e) {
      console.log(e);
      res.send(e)
    }
  })
  .post((req, res) => {
    try {
      res.end()
    } catch (e) {
      console.log(e);
      res.send(e)
    }
  })

module.exports = router;
